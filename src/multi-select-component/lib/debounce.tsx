// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { SetStateAction } from "react";

export const debounce = (
  func: { (query: SetStateAction<string>): void; apply?: any },
  wait: number | undefined
) => {
  let timeout: string | number | NodeJS.Timeout | undefined;
  return function (...args: any) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      // eslint-disable-next-line prefer-spread
      func.apply(null, args);
    }, wait);
  };
};
