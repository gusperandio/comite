import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface ServerToClientEvents {
  message: (data: string) => void;
}

export interface ClientToServerEvents {
  message: (data: string) => void;
}