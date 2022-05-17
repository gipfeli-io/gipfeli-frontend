import { Point } from 'geojson';

export interface Tour {
    id: string;
    name: string;
    startLocation: Point;
    endLocation: Point;
    description: string;
}