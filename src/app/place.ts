
export class Place {
    name: string;
    picture: string;
    status: string;
    startTimes: Date[];
    endTimes: Date[];
    location: string;
    constructor(name: string, startTimes: Date[],
        endTimes: Date[], picture: string, status: string, location: string) {

        this.name = name;
        this.startTimes = startTimes;
        this.endTimes = endTimes;
        this.picture = picture;
        this.status = status;
        this.location = location;

    }
}

