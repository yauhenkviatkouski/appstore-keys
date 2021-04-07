class AvailableRequestTime {
  private static instance: AvailableRequestTime;
  private time: number = 0;
  private constructor() {}

  public static getInstance(): AvailableRequestTime {
    if (!AvailableRequestTime.instance) {
      AvailableRequestTime.instance = new AvailableRequestTime();
    }

    return AvailableRequestTime.instance;
  }

  get() {
    return this.time;
  }

  increase(additionalTime: number) {
    this.time += additionalTime;
  }
}

export { AvailableRequestTime };
