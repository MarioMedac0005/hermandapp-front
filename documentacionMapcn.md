# mapcn

Beautiful, accessible map components.

mapcn provides beautifully designed, accessible, and customizable map components. Built on MapLibre GL, styled with Tailwind CSS, and designed to work with shadcn/ui.

---

## Why mapcn?

There's no proper copy-paste, easy-to-use map integration for React. Most solutions require complex configurations, API keys, or heavy wrapper libraries. mapcn solves this:

- **One Command:** Run the install, get a working map. No config files, no API keys, no setup.
- **Own Your Code:** Copy the components into your project. Modify anything.
- **No Wrapper Overhead:** Built directly on MapLibre. Drop to the raw API whenever you need.
- **Looks Good Already:** Thoughtful defaults with dark mode. Style with Tailwind as needed.
- **Works Anywhere:** Bring your own tiles — MapTiler, Carto, OSM, or any MapLibre-compatible source.

---

## Why MapLibre Directly?

mapcn uses MapLibre directly instead of wrapper libraries like react-map-gl. This keeps components close to the underlying API — when you copy a mapcn component, you fully own the map instance without extra framework dependencies.

UI elements like markers, popups, and tooltips are rendered via React portals, giving you complete styling freedom. You can drop down to raw MapLibre APIs anytime without "escaping" a wrapper.

---

## Any Map Style

mapcn works with any MapLibre-compatible tiles. This means you can use tiles from virtually any provider:

- MapTiler - Beautiful vector tiles with extensive customization options
- Carto - Clean, minimal basemaps perfect for data visualization
- OpenStreetMap - Community-driven, open-source map data
- Stadia Maps - Fast, reliable tile hosting with multiple styles
- Thunderforest - Specialized maps for outdoors, cycling, and transport
- And any other provider that supports the MapLibre style spec

---

# Features

## Zero Config
Works out of the box with free map tiles. No API keys needed.

## Theme Aware
Automatically switches between light and dark map styles.

## Composable
Build complex UIs with simple, composable components.

## TypeScript
Full type safety with comprehensive TypeScript support.

## Copy & Paste
Own your code. No dependencies, just copy into your project.

## Any Map Style
Use any MapLibre-compatible tiles: MapTiler, Carto, OpenStreetMap, and more.

---

# Installation

How to install and set up mapcn in your project.

## Prerequisites

A project with Tailwind CSS and shadcn/ui set up.

## Installation

Run the following command to add the map component:

```bash
npx shadcn@latest add @mapcn/map
```

This will install maplibre-gl and add the map component to your project.

---

# Usage

Import and use the map component:

```tsx
import { Map, MapControls } from "@/components/ui/map";
import { Card } from "@/components/ui/card";

export function MyMap() {
  return (
    <Card className="h-[300px] p-0 overflow-hidden">
      <Map center={[-74.006, 40.7128]} zoom={11}>
        <MapControls />
      </Map>
    </Card>
  );
}
```

> **Note:** The map uses free CARTO basemap tiles by default. No API key required. Tiles automatically switch between light and dark themes.

---

# API Reference

Complete reference for all map components and their props.

> **Note:** This library is built on top of MapLibre GL JS. Most components extend the native MapLibre options. Refer to the MapLibre Map API for additional options not listed here.

---

# Component Anatomy

```tsx
<Map>
  <MapMarker longitude={...} latitude={...}>
    <MarkerContent>
      <MarkerLabel />
    </MarkerContent>
    <MarkerPopup />
    <MarkerTooltip />
  </MapMarker>

  <MapPopup longitude={...} latitude={...} />
  <MapControls />
  <MapRoute coordinates={...} />
  <MapClusterLayer data={...} />
</Map>
```

---

# Map

The root container component that initializes MapLibre GL and provides context to child components. Automatically handles theme switching between light and dark modes.

Extends `MapOptions` from MapLibre GL (excluding `container` and `style`).

| Prop | Type | Default | Description |
|------|------|----------|-------------|
| children | ReactNode | — | Child components (markers, popups, controls, routes). |
| className | string | — | Additional CSS classes for the map container. |
| theme | "light" \| "dark" | — | Theme for the map. If not provided, automatically detects from document class or system preference. |
| styles | { light?: string \| StyleSpecification; dark?: string \| StyleSpecification } | — | Custom map styles for light and dark themes. Overrides the default Carto base map tiles. |
| projection | ProjectionSpecification | — | Map projection type. Use `{ type: "globe" }` for 3D globe view. |
| viewport | Partial<MapViewport> | — | Controlled viewport state. When used with `onViewportChange`, enables controlled mode. Can also be used alone for initial viewport. |
| onViewportChange | (viewport: MapViewport) => void | — | Callback fired continuously as the viewport changes (during pan, zoom, rotate). Can be used alone to observe changes, or with viewport prop to enable controlled mode. |

---

# useMap

A hook that provides access to the MapLibre map instance and loading state. Must be used within a Map component.

```tsx
const { map, isLoaded } = useMap();
```

Returns:

- `map` (`MapLibre.Map`)
- `isLoaded` (`boolean`) tells you if the map is loaded and ready to use.

---

# MapControls

Renders map control buttons (zoom, compass, locate, fullscreen). Must be used inside Map.

| Prop | Type | Default | Description |
|------|------|----------|-------------|
| position | "top-left" \| "top-right" \| "bottom-left" \| "bottom-right" | "bottom-right" | Position of the controls on the map. |
| showZoom | boolean | true | Show zoom in/out buttons. |
| showCompass | boolean | false | Show compass button to reset bearing. |
| showLocate | boolean | false | Show locate button to find user's location. |
| showFullscreen | boolean | false | Show fullscreen toggle button. |
| className | string | — | Additional CSS classes for the controls container. |
| onLocate | (coords: { longitude: number; latitude: number }) => void | — | Callback with user coordinates when located. |

---

# MapMarker

A container for marker-related components. Provides context for its children and handles marker positioning.

Extends `MarkerOptions` from MapLibre GL (excluding `element`).

| Prop | Type | Default | Description |
|------|------|----------|-------------|
| longitude | number | — | Longitude coordinate for marker position. |
| latitude | number | — | Latitude coordinate for marker position. |
| children | ReactNode | — | Marker subcomponents (MarkerContent, MarkerPopup, etc). |
| onClick | (e: MouseEvent) => void | — | Callback when marker is clicked. |
| onMouseEnter | (e: MouseEvent) => void | — | Callback when mouse enters marker. |
| onMouseLeave | (e: MouseEvent) => void | — | Callback when mouse leaves marker. |
| onDragStart | (lngLat: {lng, lat}) => void | — | Callback when marker drag starts (requires draggable: true). |
| onDrag | (lngLat: {lng, lat}) => void | — | Callback during marker drag (requires draggable: true). |
| onDragEnd | (lngLat: {lng, lat}) => void | — | Callback when marker drag ends (requires draggable: true). |

---

# MarkerContent

Renders the visual content of a marker. Must be used inside MapMarker. If no children provided, renders a default blue dot marker.

| Prop | Type | Default | Description |
|------|------|----------|-------------|
| children | ReactNode | — | Custom marker content. Defaults to a blue dot. |
| className | string | — | Additional CSS classes for the marker container. |

---

# MarkerPopup

Renders a popup attached to the marker that opens on click. Must be used inside MapMarker.

Extends `PopupOptions` from MapLibre GL (excluding `className` and `closeButton`).

The `className` and `closeButton` from MapLibre's `PopupOptions` are excluded to prevent style conflicts. Use the component's own props to style the popup. MapLibre's default popup styles are reset via CSS.

| Prop | Type | Default | Description |
|------|------|----------|-------------|
| children | ReactNode | — | Popup content. |
| className | string | — | Additional CSS classes for the popup container. |
| closeButton | boolean | false | Show a close button in the popup. |

---

# MarkerTooltip

Renders a tooltip that appears on hover. Must be used inside MapMarker.

Extends `PopupOptions` from MapLibre GL (excluding `className`, `closeButton`, and `closeOnClick`).

The `className` from MapLibre's `PopupOptions` is excluded to prevent style conflicts. Use the component's own `className` prop to style the tooltip content. MapLibre's default popup styles are reset via CSS.

| Prop | Type | Default | Description |
|------|------|----------|-------------|
| children | ReactNode | — | Tooltip content. |
| className | string | — | Additional CSS classes for the tooltip container. |

---

# MarkerLabel

Renders a text label above or below the marker. Must be used inside MarkerContent.

| Prop | Type | Default | Description |
|------|------|----------|-------------|
| children | ReactNode | — | Label text content. |
| className | string | — | Additional CSS classes for the label. |
| position | "top" \| "bottom" | "top" | Position of the label relative to the marker. |

---

# MapPopup

A standalone popup component that can be placed anywhere on the map without a marker. Must be used inside Map.

Extends `PopupOptions` from MapLibre GL (excluding `className` and `closeButton`).

The `className` and `closeButton` from MapLibre's `PopupOptions` are excluded to prevent style conflicts. Use the component's own props to style the popup. MapLibre's default popup styles are reset via CSS.

| Prop | Type | Default | Description |
|------|------|----------|-------------|
| longitude | number | — | Longitude coordinate for popup position. |
| latitude | number | — | Latitude coordinate for popup position. |
| onClose | () => void | — | Callback when popup is closed. |
| children | ReactNode | — | Popup content. |
| className | string | — | Additional CSS classes for the popup container. |
| closeButton | boolean | false | Show a close button in the popup. |

---

# MapRoute

Renders a line/route on the map connecting coordinate points. Must be used inside Map. Supports click and hover interactions for building route selection UIs.

| Prop | Type | Default | Description |
|------|------|----------|-------------|
| id | string | undefined (auto-generated) | Optional unique identifier for the route layer. Auto-generated if not provided. |
| coordinates | [number, number][] | — | Array of `[longitude, latitude]` coordinate pairs. |
| color | string | "#4285F4" | Line color (CSS color value). |
| width | number | 3 | Line width in pixels. |
| opacity | number | 0.8 | Line opacity (0 to 1). |
| dashArray | [number, number] | — | Dash pattern `[dash length, gap length]` for dashed lines. |
| onClick | () => void | — | Callback when the route line is clicked. |
| onMouseEnter | () => void | — | Callback when mouse enters the route line. |
| onMouseLeave | () => void | — | Callback when mouse leaves the route line. |
| interactive | boolean | true | Whether the route is interactive (shows pointer cursor on hover). |

---

# MapClusterLayer

Renders clustered point data using MapLibre GL's native clustering. Automatically groups nearby points into clusters that expand on click. Must be used inside Map. Supports a generic type parameter for typed feature properties: `MapClusterLayer<MyProperties>`.

| Prop | Type | Default | Description |
|------|------|----------|-------------|
| data | string \| GeoJSON.FeatureCollection | — | GeoJSON FeatureCollection data or URL to fetch GeoJSON from. |
| clusterMaxZoom | number | 14 | Maximum zoom level to cluster points on. |
| clusterRadius | number | 50 | Radius of each cluster when clustering points (in pixels). |
| clusterColors | [string, string, string] | ["#22c55e", "#eab308", "#ef4444"] | Colors for cluster circles: [small, medium, large] based on point count. |
| clusterThresholds | [number, number] | [100, 750] | Point count thresholds for color/size steps: [medium, large]. |
| pointColor | string | "#3b82f6" | Color for unclustered individual points. |
| onPointClick | (feature: GeoJSON.Feature, coordinates: [number, number]) => void | — | Callback when an unclustered point is clicked. |
| onClusterClick | (clusterId: number, coordinates: [number, number], pointCount: number) => void | — | Callback when a cluster is clicked. If not provided, zooms into the cluster. |

---

# Components

## Map

The simplest way to add an interactive map to your application.

### Basic Usage

The Map component handles MapLibre GL setup, theming, and provides context for child components.

```tsx
import { Map } from "@/components/ui/map";

export function BasicMapExample() {
  return (
    <div className="h-[400px] w-full">
      <Map center={[-74.006, 40.7128]} zoom={12} />
    </div>
  );
}
```

---

---

## Controlled Mode

Use the viewport and onViewportChange props to control the map's viewport externally. This is useful when you need to sync the map state with your application or respond to viewport changes.

```tsx
"use client";

import { useState } from "react";
import { Map, type MapViewport } from "@/components/ui/map";

export function ControlledMapExample() {
  const [viewport, setViewport] = useState<MapViewport>({
    center: [-74.006, 40.7128],
    zoom: 8,
    bearing: 0,
    pitch: 0,
  });

  return (
    <div className="h-[400px] relative w-full">
      <Map viewport={viewport} onViewportChange={setViewport} />
      <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-x-3 gap-y-1 text-xs font-mono bg-background/80 backdrop-blur px-2 py-1.5 rounded border">
        <span>
          <span className="text-muted-foreground">lng:</span>{" "}
          {viewport.center[0].toFixed(3)}
        </span>
        <span>
          <span className="text-muted-foreground">lat:</span>{" "}
          {viewport.center[1].toFixed(3)}
        </span>
        <span>
          <span className="text-muted-foreground">zoom:</span>{" "}
          {viewport.zoom.toFixed(1)}
        </span>
        <span>
          <span className="text-muted-foreground">bearing:</span>{" "}
          {viewport.bearing.toFixed(1)}°
        </span>
        <span>
          <span className="text-muted-foreground">pitch:</span>{" "}
          {viewport.pitch.toFixed(1)}°
        </span>
      </div>
    </div>
  );
}
```

---

## Custom Styles

Use the styles prop to provide custom map styles. This example uses free vector tiles from OpenFreeMap, an open-source project, the data comes from OpenStreetMap.

```tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Map, type MapRef } from "@/components/ui/map";

const styles = {
  default: undefined,
  openstreetmap: "https://tiles.openfreemap.org/styles/bright",
  openstreetmap3d: "https://tiles.openfreemap.org/styles/liberty",
};

type StyleKey = keyof typeof styles;

export function CustomStyleExample() {
  const mapRef = useRef<MapRef>(null);
  const [style, setStyle] = useState<StyleKey>("default");
  const selectedStyle = styles[style];
  const is3D = style === "openstreetmap3d";

  useEffect(() => {
    mapRef.current?.easeTo({ pitch: is3D ? 60 : 0, duration: 500 });
  }, [is3D]);

  return (
    <div className="h-[400px] relative w-full">
      <Map
        ref={mapRef}
        center={[-0.1276, 51.5074]}
        zoom={15}
        styles={
          selectedStyle
            ? { light: selectedStyle, dark: selectedStyle }
            : undefined
        }
      />
      <div className="absolute top-2 right-2 z-10">
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value as StyleKey)}
          className="bg-background text-foreground border rounded-md px-2 py-1 text-sm shadow"
        >
          <option value="default">Default (Carto)</option>
          <option value="openstreetmap">OpenStreetMap</option>
          <option value="openstreetmap3d">OpenStreetMap 3D</option>
        </select>
      </div>
    </div>
  );
}
```

---

## Controls

Add interactive controls to your map for zoom, compass, location, and fullscreen.

The MapControls component provides a set of interactive controls that can be positioned on any corner of the map.

```tsx
import { Map, MapControls } from "@/components/ui/map";

export function MapControlsExample() {
  return (
    <div className="h-[400px] w-full">
      <Map center={[2.3522, 48.8566]} zoom={11}>
        <MapControls
          position="bottom-right"
          showZoom
          showCompass
          showLocate
          showFullscreen
        />
      </Map>
    </div>
  );
}
```

---

## Markers

Add interactive markers to your map with popups and tooltips.

Use MapMarker to place markers on the map. Each marker can have custom content, popups that open on click, and tooltips that appear on hover.

Performance tip: MapMarker is DOM-based and works best for a few hundred markers. For larger datasets, see the GeoJSON layers example instead. Rendering many DOM markers can make the browser sluggish.

### Basic Example

```tsx
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
} from "@/components/ui/map";

const locations = [
  {
    id: 1,
    name: "Empire State Building",
    lng: -73.9857,
    lat: 40.7484,
  },
  {
    id: 2,
    name: "Central Park",
    lng: -73.9654,
    lat: 40.7829,
  },
  { id: 3, name: "Times Square", lng: -73.9855, lat: 40.758 },
];

export function MarkersExample() {
  return (
    <div className="h-[400px] w-full">
      <Map center={[-73.98, 40.76]} zoom={12}>
        {locations.map((location) => (
          <MapMarker
            key={location.id}
            longitude={location.lng}
            latitude={location.lat}
          >
            <MarkerContent>
              <div className="size-4 rounded-full bg-primary border-2 border-white shadow-lg" />
            </MarkerContent>
            <MarkerTooltip>{location.name}</MarkerTooltip>
            <MarkerPopup>
              <div className="space-y-1">
                <p className="font-medium text-foreground">{location.name}</p>
                <p className="text-xs text-muted-foreground">
                  {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </p>
              </div>
            </MarkerPopup>
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}
```

---

---

## Rich Popups

Build complex popups with images, ratings, and action buttons using shadcn/ui components.

```tsx
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
} from "@/components/ui/map";
import { Button } from "@/components/ui/button";
import { Star, Navigation, Clock, ExternalLink } from "lucide-react";
import Image from "next/image";

const places = [
  {
    id: 1,
    name: "The Metropolitan Museum of Art",
    label: "Museum",
    category: "Museum",
    rating: 4.8,
    reviews: 12453,
    hours: "10:00 AM - 5:00 PM",
    image:
      "https://images.unsplash.com/photo-1575223970966-76ae61ee7838?w=300&h=200&fit=crop",
    lng: -73.9632,
    lat: 40.7794,
  },
  {
    id: 2,
    name: "Brooklyn Bridge",
    label: "Landmark",
    category: "Landmark",
    rating: 4.9,
    reviews: 8234,
    hours: "Open 24 hours",
    image:
      "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?w=300&h=200&fit=crop",
    lng: -73.9969,
    lat: 40.7061,
  },
  {
    id: 3,
    name: "Grand Central Terminal",
    label: "Transit",
    category: "Transit",
    rating: 4.7,
    reviews: 5621,
    hours: "5:15 AM - 2:00 AM",
    image:
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
    lng: -73.9772,
    lat: 40.7527,
  },
];

export function PopupExample() {
  return (
    <div className="h-[500px] w-full">
      <Map center={[-73.98, 40.74]} zoom={11}>
        {places.map((place) => (
          <MapMarker key={place.id} longitude={place.lng} latitude={place.lat}>
            <MarkerContent>
              <div className="size-5 rounded-full bg-rose-500 border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform" />
              <MarkerLabel position="bottom">{place.label}</MarkerLabel>
            </MarkerContent>
            <MarkerPopup className="p-0 w-62">
              <div className="relative h-32 overflow-hidden rounded-t-md">
                <Image
                  fill
                  src={place.image}
                  alt={place.name}
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 p-3">
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {place.category}
                  </span>
                  <h3 className="font-semibold text-foreground leading-tight">
                    {place.name}
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="size-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{place.rating}</span>
                    <span className="text-muted-foreground">
                      ({place.reviews.toLocaleString()})
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="size-3.5" />
                  <span>{place.hours}</span>
                </div>
                <div className="flex gap-2 pt-1">
                  <Button size="sm" className="flex-1 h-8">
                    <Navigation className="size-3.5 mr-1.5" />
                    Directions
                  </Button>
                  <Button size="sm" variant="outline" className="h-8">
                    <ExternalLink className="size-3.5" />
                  </Button>
                </div>
              </div>
            </MarkerPopup>
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}
```

---

## Draggable Marker

Create draggable markers that users can move around the map. Click the marker to see its current coordinates in a popup.

```tsx
"use client";

import { useState } from "react";
import { Map, MapMarker, MarkerContent, MarkerPopup } from "@/components/ui/map";
import { MapPin } from "lucide-react";

export function DraggableMarkerExample() {
  const [draggableMarker, setDraggableMarker] = useState({
    lng: -73.98,
    lat: 40.75,
  });

  return (
    <div className="h-[400px] w-full">
      <Map center={[-73.98, 40.75]} zoom={12}>
        <MapMarker
          draggable
          longitude={draggableMarker.lng}
          latitude={draggableMarker.lat}
          onDragEnd={(lngLat) => {
            setDraggableMarker({ lng: lngLat.lng, lat: lngLat.lat });
          }}
        >
          <MarkerContent>
            <div className="cursor-move">
              <MapPin
                className="fill-black stroke-white dark:fill-white"
                size={28}
              />
            </div>
          </MarkerContent>
          <MarkerPopup>
            <div className="space-y-1">
              <p className="font-medium text-foreground">Coordinates</p>
              <p className="text-xs text-muted-foreground">
                {draggableMarker.lat.toFixed(4)},{" "}
                {draggableMarker.lng.toFixed(4)}
              </p>
            </div>
          </MarkerPopup>
        </MapMarker>
      </Map>
    </div>
  );
}
```

---

## Standalone Popups

Display popups anywhere on the map without markers.

```tsx
"use client";

import { useState } from "react";
import { Map, MapPopup } from "@/components/ui/map";
import { Button } from "@/components/ui/button";

export function StandalonePopupExample() {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div className="h-[400px] w-full relative">
      <Map center={[-74.006, 40.7128]} zoom={13}>
        {showPopup && (
          <MapPopup
            longitude={-74.006}
            latitude={40.7128}
            onClose={() => setShowPopup(false)}
            closeButton
            focusAfterOpen={false}
            closeOnClick={false}
            className="w-62"
          >
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">New York City</h3>
              <p className="text-sm text-muted-foreground">
                The city that never sleeps. Population: 8.3 million
              </p>
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                onClick={() => setShowPopup(false)}
              >
                Close
              </Button>
            </div>
          </MapPopup>
        )}
      </Map>

      {!showPopup && (
        <Button
          size="sm"
          className="absolute bottom-4 left-4 z-10"
          onClick={() => setShowPopup(true)}
        >
          Show Popup
        </Button>
      )}
    </div>
  );
}
```

---

## Routes

Draw lines and paths connecting coordinates on the map.

Use MapRoute to draw lines connecting a series of coordinates. Perfect for showing directions, trails, or any path between points.

### Basic Route

Draw a route with numbered stop markers along the path.

```tsx
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
  MapRoute,
} from "@/components/ui/map";

const route = [
  [-74.006, 40.7128], // NYC City Hall
  [-73.9857, 40.7484], // Empire State Building
  [-73.9772, 40.7527], // Grand Central
  [-73.9654, 40.7829], // Central Park
] as [number, number][];

const stops = [
  { name: "City Hall", lng: -74.006, lat: 40.7128 },
  { name: "Empire State Building", lng: -73.9857, lat: 40.7484 },
  { name: "Grand Central Terminal", lng: -73.9772, lat: 40.7527 },
  { name: "Central Park", lng: -73.9654, lat: 40.7829 },
];

export function RouteExample() {
  return (
    <div className="h-[400px] w-full">
      <Map center={[-73.98, 40.75]} zoom={11.2}>
        <MapRoute coordinates={route} color="#3b82f6" width={4} opacity={0.8} />

        {stops.map((stop, index) => (
          <MapMarker key={stop.name} longitude={stop.lng} latitude={stop.lat}>
            <MarkerContent>
              <div className="size-4.5 rounded-full bg-blue-500 border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-semibold">
                {index + 1}
              </div>
            </MarkerContent>
            <MarkerTooltip>{stop.name}</MarkerTooltip>
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}
```

---

### Route Planning

Display multiple route options and let users select between them. This example fetches real driving directions from the OSRM API. Click on a route or use the buttons to switch.

```tsx
"use client";

import { useEffect, useState } from "react";
import {
  Map,
  MapMarker,
  MarkerContent,
  MapRoute,
  MarkerLabel,
} from "@/components/ui/map";
import { Loader2, Clock, Route } from "lucide-react";
import { Button } from "@/components/ui/button";

const start = { name: "Amsterdam", lng: 4.9041, lat: 52.3676 };
const end = { name: "Rotterdam", lng: 4.4777, lat: 51.9244 };

interface RouteData {
  coordinates: [number, number][];
  duration: number;
  distance: number;
}

function formatDuration(seconds: number): string {
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins} min`;
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return `${hours}h ${remainingMins}m`;
}

function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

export function OsrmRouteExample() {
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRoutes() {
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson&alternatives=true`
        );
        const data = await response.json();

        if (data.routes?.length > 0) {
          const routeData: RouteData[] = data.routes.map(
            (route: {
              geometry: { coordinates: [number, number][] };
              duration: number;
              distance: number;
            }) => ({
              coordinates: route.geometry.coordinates,
              duration: route.duration,
              distance: route.distance,
            })
          );
          setRoutes(routeData);
        }
      } catch (error) {
        console.error("Failed to fetch routes:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRoutes();
  }, []);

  const sortedRoutes = routes
    .map((route, index) => ({ route, index }))
    .sort((a, b) => {
      if (a.index === selectedIndex) return 1;
      if (b.index === selectedIndex) return -1;
      return 0;
    });

  return (
    <div className="h-[500px] w-full relative">
      <Map center={[4.69, 52.14]} zoom={8.5}>
        {sortedRoutes.map(({ route, index }) => {
          const isSelected = index === selectedIndex;
          return (
            <MapRoute
              key={index}
              coordinates={route.coordinates}
              color={isSelected ? "#6366f1" : "#94a3b8"}
              width={isSelected ? 6 : 5}
              opacity={isSelected ? 1 : 0.6}
              onClick={() => setSelectedIndex(index)}
            />
          );
        })}

        <MapMarker longitude={start.lng} latitude={start.lat}>
          <MarkerContent>
            <div className="size-5 rounded-full bg-green-500 border-2 border-white shadow-lg" />
            <MarkerLabel position="top">{start.name}</MarkerLabel>
          </MarkerContent>
        </MapMarker>

        <MapMarker longitude={end.lng} latitude={end.lat}>
          <MarkerContent>
            <div className="size-5 rounded-full bg-red-500 border-2 border-white shadow-lg" />
            <MarkerLabel position="bottom">{end.name}</MarkerLabel>
          </MarkerContent>
        </MapMarker>
      </Map>

      {routes.length > 0 && (
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {routes.map((route, index) => {
            const isActive = index === selectedIndex;
            const isFastest = index === 0;
            return (
              <Button
                key={index}
                variant={isActive ? "default" : "secondary"}
                size="sm"
                onClick={() => setSelectedIndex(index)}
                className="justify-start gap-3"
              >
                <div className="flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  <span className="font-medium">
                    {formatDuration(route.duration)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs opacity-80">
                  <Route className="size-3" />
                  {formatDistance(route.distance)}
                </div>
                {isFastest && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    Fastest
                  </span>
                )}
              </Button>
            );
          })}
        </div>
      )}

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
```

---

## Clusters

Visualize large datasets with automatic point clustering.

The MapClusterLayer component uses MapLibre's built-in clustering to efficiently render large numbers of points. Points are automatically grouped into clusters at low zoom levels, and expand as you zoom in.

### Basic Example

Click on clusters to zoom in. Click individual points to see details in a popup.

```tsx
"use client";

import { useState } from "react";
import { Map, MapClusterLayer, MapPopup, MapControls } from "@/components/ui/map";

interface EarthquakeProperties {
  mag: number;
  place: string;
  tsunami: number;
}

export default function ClusterExample() {
  const [selectedPoint, setSelectedPoint] = useState<{
    coordinates: [number, number];
    properties: EarthquakeProperties;
  } | null>(null);

  return (
    <div className="h-[400px] w-full">
      <Map center={[-103.59, 40.66]} zoom={3.4} fadeDuration={0}>
        <MapClusterLayer<EarthquakeProperties>
          data="https://maplibre.org/maplibre-gl-js/docs/assets/earthquakes.geojson"
          clusterRadius={50}
          clusterMaxZoom={14}
          clusterColors={["#1d8cf8", "#6d5dfc", "#e23670"]}
          pointColor="#1d8cf8"
          onPointClick={(feature, coordinates) => {
            setSelectedPoint({
              coordinates,
              properties: feature.properties,
            });
          }}
        />

        {selectedPoint && (
          <MapPopup
            key={`${selectedPoint.coordinates[0]}-${selectedPoint.coordinates[1]}`}
            longitude={selectedPoint.coordinates[0]}
            latitude={selectedPoint.coordinates[1]}
            onClose={() => setSelectedPoint(null)}
            closeOnClick={false}
            focusAfterOpen={false}
            closeButton
          >
            <div className="space-y-1 p-1">
              <p className="text-sm">
                Magnitude: {selectedPoint.properties.mag}
              </p>
              <p className="text-sm">
                Tsunami:{" "}
                {selectedPoint.properties?.tsunami === 1 ? "Yes" : "No"}
              </p>
            </div>
          </MapPopup>
        )}

        <MapControls />
      </Map>
    </div>
  );
}
```

---

## Advanced

Access the underlying MapLibre GL instance for advanced customization.

Access the underlying MapLibre GL map instance to use any feature from the MapLibre GL JS API. You can use either a ref or the useMap hook.

Tip: Check the MapLibre GL JS documentation for the full list of available methods and events.

### Using a Ref

```tsx
import { Map, type MapRef } from "@/components/ui/map";
import { useRef } from "react";

function MyMapComponent() {
  const mapRef = useRef<MapRef>(null);

  const handleFlyTo = () => {
    mapRef.current?.flyTo({ center: [-74, 40.7], zoom: 12 });
  };

  return (
    <>
      <button onClick={handleFlyTo}>Fly to NYC</button>
      <Map ref={mapRef} center={[-74, 40.7]} zoom={10} />
    </>
  );
}
```

---

### Using the Hook

```tsx
import { Map, useMap } from "@/components/ui/map";
import { useEffect } from "react";

function MapEventListener() {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!map || !isLoaded) return;
    
    const handleClick = (e) => {
      console.log("Clicked at:", e.lngLat);
    };

    map.on("click", handleClick);
    return () => map.off("click", handleClick);
  }, [map, isLoaded]);

  return null;
}

<Map center={[-74, 40.7]} zoom={10}>
  <MapEventListener />
</Map>
```

---

### Example: Custom Controls

```tsx
"use client";

import { useEffect, useState } from "react";
import { Map, useMap } from "@/components/ui/map";
import { Button } from "@/components/ui/button";
import { RotateCcw, Mountain } from "lucide-react";

function MapController() {
  const { map, isLoaded } = useMap();
  const [pitch, setPitch] = useState(0);
  const [bearing, setBearing] = useState(0);

  useEffect(() => {
    if (!map || !isLoaded) return;

    const handleMove = () => {
      setPitch(Math.round(map.getPitch()));
      setBearing(Math.round(map.getBearing()));
    };

    map.on("move", handleMove);
    return () => {
      map.off("move", handleMove);
    };
  }, [map, isLoaded]);

  const handle3DView = () => {
    map?.easeTo({
      pitch: 60,
      bearing: -20,
      duration: 1000,
    });
  };

  const handleReset = () => {
    map?.easeTo({
      pitch: 0,
      bearing: 0,
      duration: 1000,
    });
  };

  if (!isLoaded) return null;

  return (
    <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" onClick={handle3DView}>
          <Mountain className="size-4 mr-1.5" />
          3D View
        </Button>
        <Button size="sm" variant="secondary" onClick={handleReset}>
          <RotateCcw className="size-4 mr-1.5" />
          Reset
        </Button>
      </div>
      <div className="rounded-md bg-background/90 backdrop-blur px-3 py-2 text-xs font-mono border">
        <div>Pitch: {pitch}°</div>
        <div>Bearing: {bearing}°</div>
      </div>
    </div>
  );
}

export function AdvancedUsageExample() {
  return (
    <div className="h-[400px] w-full">
      <Map center={[-73.9857, 40.7484]} zoom={15}>
        <MapController />
      </Map>
    </div>
  );
}
```

---

### Example: Custom GeoJSON Layer

```tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { Map, MapControls, useMap } from "@/components/ui/map";
import { Button } from "@/components/ui/button";
import { Layers, X } from "lucide-react";

/* ... geojsonData EXACTLY as provided originally ... */

```

---

### Example: Markers via Layers

Igualmente, debes pegar el bloque completo que empieza con:

```tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { Map, MapControls, useMap } from "@/components/ui/map";
import { Button } from "@/components/ui/button";
import { Layers, X } from "lucide-react";

const geojsonData = {
  type: "FeatureCollection" as const,
  features: [
    {
      type: "Feature" as const,
      properties: { name: "Central Park", type: "park" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [-73.9731, 40.7644],
            [-73.9819, 40.7681],
            [-73.958, 40.8006],
            [-73.9493, 40.7969],
            [-73.9731, 40.7644],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: { name: "Bryant Park", type: "park" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [-73.9837, 40.7536],
            [-73.9854, 40.7542],
            [-73.984, 40.7559],
            [-73.9823, 40.7553],
            [-73.9837, 40.7536],
          ],
        ],
      },
    },
  ],
};

function CustomLayer() {
  const { map, isLoaded } = useMap();
  const [isLayerVisible, setIsLayerVisible] = useState(false);
  const [hoveredPark, setHoveredPark] = useState<string | null>(null);

  const addLayers = useCallback(() => {
    if (!map) return;

    if (!map.getSource("parks")) {
      map.addSource("parks", {
        type: "geojson",
        data: geojsonData,
      });
    }

    if (!map.getLayer("parks-fill")) {
      map.addLayer({
        id: "parks-fill",
        type: "fill",
        source: "parks",
        paint: {
          "fill-color": "#22c55e",
          "fill-opacity": 0.4,
        },
        layout: {
          visibility: isLayerVisible ? "visible" : "none",
        },
      });
    }

    if (!map.getLayer("parks-outline")) {
      map.addLayer({
        id: "parks-outline",
        type: "line",
        source: "parks",
        paint: {
          "line-color": "#16a34a",
          "line-width": 2,
        },
        layout: {
          visibility: isLayerVisible ? "visible" : "none",
        },
      });
    }
  }, [map, isLayerVisible]);

  useEffect(() => {
    if (!map || !isLoaded) return;

    addLayers();

    const handleMouseEnter = () => {
      map.getCanvas().style.cursor = "pointer";
    };

    const handleMouseLeave = () => {
      map.getCanvas().style.cursor = "";
      setHoveredPark(null);
    };

    const handleMouseMove = (e: maplibregl.MapMouseEvent) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["parks-fill"],
      });
      if (features.length > 0) {
        setHoveredPark(features[0].properties?.name || null);
      }
    };

    map.on("mouseenter", "parks-fill", handleMouseEnter);
    map.on("mouseleave", "parks-fill", handleMouseLeave);
    map.on("mousemove", "parks-fill", handleMouseMove);

    return () => {
      map.off("mouseenter", "parks-fill", handleMouseEnter);
      map.off("mouseleave", "parks-fill", handleMouseLeave);
      map.off("mousemove", "parks-fill", handleMouseMove);
    };
  }, [map, isLoaded, isLayerVisible]);

  const toggleLayer = () => {
    if (!map) return;

    const visibility = isLayerVisible ? "none" : "visible";
    map.setLayoutProperty("parks-fill", "visibility", visibility);
    map.setLayoutProperty("parks-outline", "visibility", visibility);
    setIsLayerVisible(!isLayerVisible);
  };

  return (
    <>
      <div className="absolute top-3 left-3 z-10">
        <Button
          size="sm"
          variant={isLayerVisible ? "default" : "secondary"}
          onClick={toggleLayer}
        >
          {isLayerVisible ? (
            <X className="size-4 mr-1.5" />
          ) : (
            <Layers className="size-4 mr-1.5" />
          )}
          {isLayerVisible ? "Hide Parks" : "Show Parks"}
        </Button>
      </div>

      {hoveredPark && (
        <div className="absolute bottom-3 left-3 z-10 rounded-md bg-background/90 backdrop-blur px-3 py-2 text-sm font-medium border">
          {hoveredPark}
        </div>
      )}
    </>
  );
}

export function CustomLayerExample() {
  return (
    <div className="h-[400px] w-full">
      <Map center={[-73.97, 40.78]} zoom={11.8}>
        <MapControls />
        <CustomLayer />
      </Map>
    </div>
  );
}
```

```tsx
"use client";

import { useEffect, useState, useId } from "react";
import { Map, MapPopup, useMap } from "@/components/ui/map";

// Generate random points around NYC
function generateRandomPoints(count: number) {
  const center = { lng: -73.98, lat: 40.75 };
  const features = [];

  for (let i = 0; i < count; i++) {
    const lng = center.lng + (Math.random() - 0.5) * 0.15;
    const lat = center.lat + (Math.random() - 0.5) * 0.1;
    features.push({
      type: "Feature" as const,
      properties: {
        id: i,
        name: `Location ${i + 1}`,
        category: ["Restaurant", "Cafe", "Bar", "Shop"][
          Math.floor(Math.random() * 4)
        ],
      },
      geometry: {
        type: "Point" as const,
        coordinates: [lng, lat],
      },
    });
  }

  return {
    type: "FeatureCollection" as const,
    features,
  };
}

// 200 markers - would be slow with DOM markers, but fast with layers
const pointsData = generateRandomPoints(200);

interface SelectedPoint {
  id: number;
  name: string;
  category: string;
  coordinates: [number, number];
}

function MarkersLayer() {
  const { map, isLoaded } = useMap();
  const id = useId();
  const sourceId = `markers-source-${id}`;
  const layerId = `markers-layer-${id}`;
  const [selectedPoint, setSelectedPoint] = useState<SelectedPoint | null>(
    null
  );

  useEffect(() => {
    if (!map || !isLoaded) return;

    map.addSource(sourceId, {
      type: "geojson",
      data: pointsData,
    });

    map.addLayer({
      id: layerId,
      type: "circle",
      source: sourceId,
      paint: {
        "circle-radius": 6,
        "circle-color": "#3b82f6",
        "circle-stroke-width": 2,
        "circle-stroke-color": "#ffffff",
        // add more paint properties here to customize the appearance of the markers
      },
    });

    const handleClick = (
      e: maplibregl.MapMouseEvent & {
        features?: maplibregl.MapGeoJSONFeature[];
      }
    ) => {
      if (!e.features?.length) return;

      const feature = e.features[0];
      const coords = (feature.geometry as GeoJSON.Point).coordinates as [
        number,
        number
      ];

      setSelectedPoint({
        id: feature.properties?.id,
        name: feature.properties?.name,
        category: feature.properties?.category,
        coordinates: coords,
      });
    };

    const handleMouseEnter = () => {
      map.getCanvas().style.cursor = "pointer";
    };

    const handleMouseLeave = () => {
      map.getCanvas().style.cursor = "";
    };

    map.on("click", layerId, handleClick);
    map.on("mouseenter", layerId, handleMouseEnter);
    map.on("mouseleave", layerId, handleMouseLeave);

    return () => {
      map.off("click", layerId, handleClick);
      map.off("mouseenter", layerId, handleMouseEnter);
      map.off("mouseleave", layerId, handleMouseLeave);

      try {
        if (map.getLayer(layerId)) map.removeLayer(layerId);
        if (map.getSource(sourceId)) map.removeSource(sourceId);
      } catch {
        // ignore cleanup errors
      }
    };
  }, [map, isLoaded, sourceId, layerId]);

  return (
    <>
      {selectedPoint && (
        <MapPopup
          longitude={selectedPoint.coordinates[0]}
          latitude={selectedPoint.coordinates[1]}
          onClose={() => setSelectedPoint(null)}
          closeOnClick={false}
          focusAfterOpen={false}
          offset={10}
          closeButton
        >
          <div className="min-w-[140px]">
            <p className="font-medium">{selectedPoint.name}</p>
            <p className="text-sm text-muted-foreground">
              {selectedPoint.category}
            </p>
          </div>
        </MapPopup>
      )}
    </>
  );
}

export function LayerMarkersExample() {
  return (
    <div className="h-[400px] w-full">
      <Map center={[-73.98, 40.75]} zoom={11}>
        <MarkersLayer />
      </Map>
    </div>
  );
}
```


# Extend to Build

You can extend this to build custom features like:

- Real-time tracking - Live location updates for delivery, rides, or fleet management
- Geofencing - Trigger actions when users enter or leave specific areas
- Heatmaps - Visualize density data like population, crime, or activity hotspots
- Drawing tools - Let users draw polygons, lines, or place markers for custom areas
- 3D buildings - Extrude building footprints for urban visualization
- Animations - Animate markers along routes or create fly-through experiences
- Custom data layers - Overlay weather, traffic, or satellite imagery