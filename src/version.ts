export class Version {
    private _major: number;
    private _minor: number;
    private _patch: number;
    constructor(major: number, minor: number, patch: number) {
        this._major = major;
        this._minor = minor;
        this._patch = patch;
    }

    get major() {
        return this._major;
    }

    get minor() {
        return this._minor;
    }

    get patch() {
        return this._patch;
    }

    compare(other: Version) {
        if (this._major > other._major) { return ComparisonResult.Newer; }
        if (this._major < other._major) { return ComparisonResult.Older; }

        if (this._minor > other._minor) { return ComparisonResult.Newer; }
        if (this._minor < other._minor) { return ComparisonResult.Older; }

        if (this._patch > other._patch) { return ComparisonResult.Newer; }
        if (this._patch < other._patch) { return ComparisonResult.Older; }

        return ComparisonResult.Same;
    }

    static compare(v1: Version | string, v2: Version | string) {
        if (typeof v1 === 'string') { v1 = this.parse(v1); }
        if (typeof v2 === 'string') { v2 = this.parse(v2); }

        return v1.compare(v2);
    }

    static parse(v: string) {
        const [major, minor, patch] = v.split('.').map(v => parseInt(v, 10));
        return new Version(major, minor, patch);
    }
}

export enum ComparisonResult {
    Older = -1,
    Same = 0,
    Newer = 1
}