import React, { useEffect, useState, type ImgHTMLAttributes } from "react";
import type { ResolvedAsset } from "../../utils/assets";

interface AssetImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  asset: ResolvedAsset;
}

/** Renders a resolved asset; falls back to its designed placeholder if the real file fails to load. */
export function AssetImage({ asset, alt = "", loading = "lazy", ...rest }: AssetImageProps) {
  const [src, setSrc] = useState(asset.src);

  useEffect(() => setSrc(asset.src), [asset.src]);

  const isPlaceholder = src === asset.placeholder;

  return (
    <img
      {...rest}
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      data-placeholder={isPlaceholder ? "" : undefined}
      onError={() => {
        if (!isPlaceholder) setSrc(asset.placeholder);
      }} />);


}