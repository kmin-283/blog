import { IDataFetcher } from "@/libs/DataFetcher";

class AutoSaver {
  private timer: null | NodeJS.Timeout;
  private dataFetcher: IDataFetcher;

  constructor(dataFetcher: IDataFetcher) {
    this.timer = null;
    this.dataFetcher = dataFetcher;
  }

  save() {
    console.log("!!!");
  }

  setTimer() {
    const AUTO_SAVE_INTERVAL = 10000;

    if (!this.timer) {
      this.timer = setTimeout(() => {
        this.timer = null;
        this.save();
        this.setTimer();
        this.clear();
      }, AUTO_SAVE_INTERVAL);
    }
  }

  clear() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}

export default AutoSaver;
