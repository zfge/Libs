export class Sound {
  private static clickSound = new Audio("https://cdn-shengun.fr/assets/libs/sounds/click.mp3");
  private static hoverSound = new Audio("https://cdn-shengun.fr/assets/libs/sounds/hover.mp3");
  private static notificationSound = new Audio(
    "https://cdn-shengun.fr/assets/libs/sounds/notification.mp3"
  );

  public static init() {
    this.clickSound.volume = 0.5;
    this.hoverSound.volume = 0.5;
  }

  private static play(sound: HTMLAudioElement) {
    sound.pause();
    sound.currentTime = 0;
    sound.play();
  }

  public static click() {
    this.play(this.clickSound);
  }

  public static hover() {
    this.play(this.hoverSound);
  }

  public static notification() {
    this.play(this.notificationSound);
  }
}
