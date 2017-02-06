
export class Place {
    name: string;
    picture: string;

    openTimes: number[][];
    closeTimes: number[][];
    location: string;
    constructor(name: string, openTimes: number[][],
        closeTimes: number[][], picture: string, location: string) {

        this.name = name;
        this.openTimes = openTimes;
        this.closeTimes = closeTimes;
        this.picture = picture;
        this.location = location;

        }

}

