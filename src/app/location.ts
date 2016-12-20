
export class Location {
    _name: string;
    picture: string;
    _status: string;
    openTimes: Date[];
    closeTimes: Date[];
    constructor(name: string, openTimes: Date[],
        closeTimes: Date[], picture: string, status: string) {

        this._name = name;
        this.openTimes = openTimes;
        this.closeTimes = closeTimes;
        this.picture = picture;
        this._status = status;
    }
}

