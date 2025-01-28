import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
 
export interface FakeData {
    key: string;
    project: string;
    type: string;
    who: string;
    supp: string;
    demand: string;
    analist: string;
    aprov: string;
    dev: string;
    test: string;
    date: string;
    imp: string | undefined;
    show: boolean;
  }