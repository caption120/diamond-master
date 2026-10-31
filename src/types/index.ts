export type ImageSourceType =
  | 'etsy'
  | 'shopify'
  | 'instagram'
  | 'tanishq'
  | 'scene7'
  | 'amazon'
  | 'woocommerce'
  | 'cloudinary'
  | 'imgix'
  | 'zoom'
  | 'standard';

export type MediaType = 'image' | 'video';

export interface CarouselMediaItem {
  url: string;
  filename: string;
  mediaType: MediaType;
  width?: number;
  height?: number;
}

export interface DetectedImage {
  id: string;
  originalSrc: string;
  masterSrc: string;
  width: number;
  height: number;
  naturalWidth: number;
  naturalHeight: number;
  sourceType: ImageSourceType;
  qualityLabel: string;
  selected: boolean;
  altText: string;
  filename: string;
  element?: HTMLElement;
  mediaType?: MediaType;
  videoPoster?: string;
  videoDuration?: string;
  isReel?: boolean;
  carouselItems?: CarouselMediaItem[];
}

export interface ExtensionSettings {
  enabled: boolean;
  minSize: number; // in pixels, e.g. 100
  showBadges: boolean;
  autoUpgradeUrls: boolean;
  downloadAsZip: boolean;
  namingPattern: string; // e.g. 'jewelry'
}

export interface DownloadRequestMessage {
  type: 'DOWNLOAD_SINGLE' | 'DOWNLOAD_BATCH';
  images: Array<{
    url: string;
    filename: string;
  }>;
  asZip?: boolean;
  zipFilename?: string;
}

export interface ToggleMessage {
  type:
    | 'TOGGLE_OVERLAY'
    | 'TOGGLE_ENABLED'
    | 'SELECT_ALL'
    | 'DESELECT_ALL'
    | 'DOWNLOAD_ALL'
    | 'UPDATE_SETTINGS'
    | 'GET_PAGE_IMAGES'
    | 'OPEN_SIDE_PANEL';
  settings?: Partial<ExtensionSettings>;
  enabled?: boolean;
}
