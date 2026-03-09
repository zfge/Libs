import { useState, useRef, useEffect } from "react";
import "./Menu.scss";

import { useNuiEvent } from "./hooks/useNuiEvent.ts";
import isDev from "./utils/isDev.ts";
import triggerNuiCallback from "./utils/triggerNuiCallback.ts";
import { Sound } from "./utils/sound.ts";
import dev_url from "./utils/dev_url.ts";
import Button from "./components/Button.tsx";
import Checkbox from "./components/Checkbox.tsx";
import Separator from "./components/Separator.tsx";
import List from "./components/List.tsx";
import Imagebox from "./components/Imagebox.tsx";
import Textbox from "./components/Textbox.tsx";
import Title from "./components/Title.tsx";
import SearchInput from "./components/SearchInput.tsx";
import ImageButton from "./components/ImageButton.tsx";

import { ReportPreview } from "./components/ReportPreview.tsx";
import { WarnPreview } from "./components/WarnPreview.tsx";
import { BanPreview } from "./components/BanPreview.tsx";

interface Item {
  type: string;
  props: any;
}

interface Data {
  id: string;
  banner?: string;
  title: string;
  subtitle: string;
  items: Item[];
  itemsPerPage: number;
}

export default function Menu() {
  Sound.init();

  const menuRef = useRef<HTMLElement>(null);
  const [id, setId] = useState("0");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [currentDescription, setCurrentDescription] = useState('');
  const [title, setTitle] = useState('');
  const [banner, setBanner] = useState('');
  const [primaryColor, setPrimaryColor] = useState('');

  const [reportPreview, setReportPreview] = useState<{
    reportId: number;
    reportTime: string;
    reportMsg: string;
  } | null>(null);
  const [warnPreview, setWarnPreview] = useState<{
    warnId: string;
    warnReason: string;
    warnBy: string;
    warnAt: string;
    warnDiscord: string;
    warnLicense: string;
  } | null>(null);
  const [banPreview, setBanPreview] = useState<{
    banId: string;
    banRaison: string;
    banAt: string;
    banExpiration: string;
    banIdentifiers: string[];
  } | null>(null);

  useNuiEvent('snow:menu:visible', (visible: boolean) => {
    if (visible && menuRef.current) {
      menuRef.current.style.display = "flex";
    } else if (menuRef.current) {
      menuRef.current.style.display = "none";
    }
  });

  useNuiEvent('snow:menu:setData', (data: Data) => {
    setId(data.id || "0");
    setItems(data.items || []);
    setItemsPerPage(data.itemsPerPage || 10);
    setTitle(data.title || '');
    setBanner(data.banner || '');
    
    if (data.id !== id || items.length === 0) {
      setSelectedItemIndex(data.title ? 1 : 0);
    } else {
      const currentIndex = selectedItemIndex;
      const totalItems = data.title ? data.items.length + 1 : data.items.length;
      if (currentIndex >= totalItems) {
        setSelectedItemIndex(Math.max(0, totalItems - 1));
      }
    }
    
    if (data.items && data.items.length > 0) {
      const firstItem = data.items[0];
      setCurrentDescription(firstItem.props?.subtitle || '');
    }
  });

  useNuiEvent('snow:menu:setColor', (color: string) => {
    setPrimaryColor(color);
    document.documentElement.style.setProperty('--menu-primary-color', color);
  });

  useEffect(() => {
    if (primaryColor) {
      document.documentElement.style.setProperty('--menu-primary-color', primaryColor);
    }
  }, [primaryColor]);

  const updateDescription = (itemIndex: number) => {
    const itemsWithTitle = title ? [
      {
        type: "title",
        props: {
          leftLabel: title,
          rightLabel: `1/${items.length + 1}`
        }
      },
      ...items
    ] : items;
    
    const item = itemsWithTitle[itemIndex];
    if (item && item.props?.subtitle) {
      setCurrentDescription(item.props.subtitle);
    } else {
      setCurrentDescription('');
    }
  };

  useNuiEvent('snow:menu:up', () => {
    const itemsWithTitle = title ? [
      {
        type: "title",
        props: {
          leftLabel: title,
          rightLabel: `1/${items.length + 1}`
        }
      },
      ...items
    ] : items;
    
    let newIndex = selectedItemIndex - 1;
    while (newIndex >= 0 && (itemsWithTitle[newIndex]?.type === 'separator' || itemsWithTitle[newIndex]?.type === 'line' || itemsWithTitle[newIndex]?.type === 'title')) {
      newIndex--;
    }
    if (newIndex >= 0) {
      setSelectedItemIndex(newIndex);
      updateDescription(newIndex);
      Sound.hover();
    }
  });
  
  useNuiEvent('snow:menu:down', () => {
    const itemsWithTitle = title ? [
      {
        type: "title",
        props: {
          leftLabel: title,
          rightLabel: `1/${items.length + 1}`
        }
      },
      ...items
    ] : items;
    
    let newIndex = selectedItemIndex + 1;
    while (newIndex < itemsWithTitle.length && (itemsWithTitle[newIndex]?.type === 'separator' || itemsWithTitle[newIndex]?.type === 'line' || itemsWithTitle[newIndex]?.type === 'title')) {
      newIndex++;
    }
    if (newIndex < itemsWithTitle.length) {
      setSelectedItemIndex(newIndex);
      updateDescription(newIndex);
      Sound.hover();
    }
  });

  useNuiEvent('snow:menu:left', () => {
    const itemsWithTitle = title ? [
      {
        type: "title",
        props: {
          leftLabel: title,
          rightLabel: `1/${items.length + 1}`
        }
      },
      ...items
    ] : items;
    
    const currentItem = itemsWithTitle[selectedItemIndex];
    if (currentItem && currentItem.type === 'list') {
      triggerNuiCallback("snow:menu:left", { index: selectedItemIndex });
      Sound.hover();
    }
  });

  useNuiEvent('snow:menu:right', () => {
    const itemsWithTitle = title ? [
      {
        type: "title",
        props: {
          leftLabel: title,
          rightLabel: `1/${items.length + 1}`
        }
      },
      ...items
    ] : items;
    
    const currentItem = itemsWithTitle[selectedItemIndex];
    if (currentItem && currentItem.type === 'list') {
      triggerNuiCallback("snow:menu:right", { index: selectedItemIndex });
      Sound.hover();
    }
  });

  useNuiEvent('snow:menu:click', () => {
    const itemsWithTitle = title ? [
      {
        type: "title",
        props: {
          leftLabel: title,
          rightLabel: `1/${items.length + 1}`
        }
      },
      ...items
    ] : items;
    
    const currentItem = itemsWithTitle[selectedItemIndex];
    if (currentItem && currentItem.type !== 'separator' && currentItem.type !== 'title') {
      triggerNuiCallback("snow:menu:click", { index: selectedItemIndex, item: currentItem });
      Sound.click();
    }
  });

  useNuiEvent('snow:menu:close', () => {
    setItems([]);
    setSelectedItemIndex(0);
    setCurrentDescription('');
    setTitle('');
    setBanner('');
    setReportPreview(null);
    setBanPreview(null);
    setWarnPreview(null);
    if (menuRef.current) menuRef.current.style.display = "none";
    triggerNuiCallback('snow:menu:onClose', { id });
  });

  useNuiEvent(
    "snow:menu:reportPreview",
    (data: {
      reportId: number;
      reportTime: string;
      reportMsg: string;
      index: number;
    }) => {
      data ? setReportPreview(data) : setReportPreview(null);
    }
  );

  useNuiEvent(
    "snow:menu:banPreview",
    (data: {
      banId: string;
      banRaison: string;
      banAt: string;
      banExpiration: string;
      banIdentifiers: string[];
      index: number;
    }) => {
      data ? setBanPreview(data) : setBanPreview(null);
    }
  );

  useNuiEvent(
    "snow:menu:warnPreview",
    (data: {
      warnId: string;
      warnReason: string;
      warnBy: string;
      warnAt: string;
      warnDiscord: string;
      warnLicense: string;
      index: number;
    }) => {
      data ? setWarnPreview(data) : setWarnPreview(null);
    }
  );

  useNuiEvent("snow:menu:closeReportPreview", () => {
    setReportPreview(null);
  });

  useNuiEvent("snow:menu:closeBanPreview", () => {
    setBanPreview(null);
  });

  useNuiEvent("snow:menu:closeWarnPreview", () => {
    setWarnPreview(null);
  });

  if (isDev) {
    useEffect(() => {
      const testData = {
        id: "1",
        title: "",
        subtitle: "",
        banner: "f5_dev",
        itemsPerPage: 10,
        items: [
          {
            type: "title",
            props: {
              leftLabel: "Test Menu",
              rightLabel: "1/5"
            }
          },
          {
            type: "button",
            props: {
              title: "Button 1",
              subtitle: "Je sais pas quoi mettre"
            }
          },
          {
            type: "list",
            props: {
              title: "Liste",
              subtitle: "Sélectionnez une option",
              items: ["Option 1", "Option 2", "Option 3"],
              index: 0
            }
          },
          {
            type: "checkbox",
            props: {
              title: "Checkbox",
              subtitle: "Cochez cette case",
              checked: false
            }
          },
          {
            type: "button",
            props: {
              title: "Button 2",
              subtitle: "Je sais pas quoi mettre"
            }
          }
        ]
      };

      setId(testData.id);
      setItems(testData.items);
      setItemsPerPage(testData.itemsPerPage);
      setBanner(testData.banner);
      
      if (testData.items && testData.items.length > 0) {
        const firstItem = testData.items[0];
        setCurrentDescription(firstItem.props?.subtitle || '');
      }

      if (menuRef.current) menuRef.current.style.display = "flex";
    }, []);

    useEffect(() => {
      const handleKeyPress = (event: KeyboardEvent) => {
        if (!menuRef.current || menuRef.current.style.display === "none") return;

        const itemsWithTitle = title ? [
          {
            type: "title",
            props: {
              leftLabel: title,
              rightLabel: `1/${items.length + 1}`
            }
          },
          ...items
        ] : items;

        switch (event.key) {
          case 'ArrowUp':
            event.preventDefault();
            let newUpIndex = selectedItemIndex - 1;
            while (newUpIndex >= 0 && (itemsWithTitle[newUpIndex]?.type === 'separator' || itemsWithTitle[newUpIndex]?.type === 'line' || itemsWithTitle[newUpIndex]?.type === 'title')) {
              newUpIndex--;
            }
            if (newUpIndex >= 0) {
              setSelectedItemIndex(newUpIndex);
              updateDescription(newUpIndex);
              Sound.hover();
            }
            break;
          case 'ArrowDown':
            event.preventDefault();
            let newDownIndex = selectedItemIndex + 1;
            while (newDownIndex < itemsWithTitle.length && (itemsWithTitle[newDownIndex]?.type === 'separator' || itemsWithTitle[newDownIndex]?.type === 'line' || itemsWithTitle[newDownIndex]?.type === 'title')) {
              newDownIndex++;
            }
            if (newDownIndex < itemsWithTitle.length) {
              setSelectedItemIndex(newDownIndex);
              updateDescription(newDownIndex);
              Sound.hover();
            }
            break;
          case 'Enter':
            event.preventDefault();
            const currentItem = itemsWithTitle[selectedItemIndex];
            if (currentItem && currentItem.type !== 'separator' && currentItem.type !== 'title') {
              Sound.click();
            }
            break;
          case 'Escape':
            event.preventDefault();
            if (menuRef.current) {
              menuRef.current.style.display = "none";
            }
            Sound.click();
            break;
        }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }, [items, selectedItemIndex, title]);
  }

  const itemsWithTitle = title ? [
    {
      type: "title",
      props: {
        leftLabel: title,
        rightLabel: `1/${items.length + 1}`
      }
    },
    ...items
  ] : items;

  const currentPage = Math.floor(selectedItemIndex / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, itemsWithTitle.length);

  const updatedItems = itemsWithTitle.map((item) => {
    if (item.type === 'title' && item.props) {
      const currentPosition = selectedItemIndex + 1;
      const totalItems = itemsWithTitle.length;
      return {
        ...item,
        props: {
          ...item.props,
          rightLabel: `${currentPosition}/${totalItems}`
        }
      };
    }
    return item;
  });

  return (
    <main className={isDev ? "dev_bg" : ""}>
      <section ref={menuRef} className="snow__menu">
        <div
          className="snow__menu__banner"
          style={{
            backgroundImage: banner ? (
              banner === "f5_dev" ? 
              "url(https://cdn-shengun.fr/logo/Bannie%CC%80re-RageUI.png)" :
              `url(${dev_url(`assets/banners/${banner}.webp`)})`
            ) : undefined
          }}
        />
        <div className="snow__menu__body">
          {updatedItems.slice(startIndex, endIndex).map((item, index) => {
            const actualIndex = startIndex + index;
            const isSelected = actualIndex === selectedItemIndex;
            
            switch (item.type) {
              case "button":
                return <Button key={actualIndex} selected={isSelected} {...item.props} />;
              case "checkbox":
                return <Checkbox key={actualIndex} selected={isSelected} {...item.props} />;
              case "separator":
                return <Separator key={actualIndex} {...item.props} />;
              case "imagebox":
                return <Imagebox key={actualIndex} {...item.props} />;
              case "textbox":
                return <Textbox key={actualIndex} {...item.props} />;
              case "list":
                return <List key={actualIndex} selected={isSelected} {...item.props} />;
              case "title":
                return <Title key={actualIndex} {...item.props} />;
              case "searchinput":
                return <SearchInput key={actualIndex} selected={isSelected} {...item.props} />;
              case "imagebutton":
                return <ImageButton key={actualIndex} selected={isSelected} {...item.props} />;
              default:
                return null;
            }
          })}
        </div>
        {currentDescription && (
          <div className="snow__menu__description">
            {currentDescription}
          </div>
        )}
      </section>

      {reportPreview && <ReportPreview {...reportPreview} />}
      {banPreview && <BanPreview {...banPreview} />}
      {warnPreview && <WarnPreview {...warnPreview} />}
    </main>
  );
}
