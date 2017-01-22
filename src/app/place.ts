
export class Place {
    name: string;
    picture: string;
    status: string;
    startTimes: Date[];
    endTimes: Date[];
    constructor(name: string, startTimes: Date[],
        endTimes: Date[], picture: string, status: string) {

        this.name = name;
        this.startTimes = startTimes;
        this.endTimes = endTimes;
        this.picture = picture;
        this.status = status;
    }
}

