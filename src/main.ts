import "./styles/main.scss";

import marces from "./profiles/marces/marces.json";
import arodav from "./profiles/arodav/arodav.json";

type GridLayout = {
    row: number;
    rowSpan: number;
    col: number;
    colSpan: number;
};

type DockChild = {
    label: string;
    url: string;
    icon: string;
};

type LinkCard = {
    label: string;
    url: string;
    icon: string;
    layout?: GridLayout;
    variant?: "cta" | "card";
};

type LinkDock = {
    variant: "dock";
    layout: GridLayout;
    items: DockChild[];
};

type LinkItem = LinkCard | LinkDock;

type Profile = {
    avatar: string;
    name: string;
    tagline: string;
    links: LinkItem[];
    dockLinks?: DockChild[];
};

const PROFILES: Record<string, Profile> = {
    marces: marces as Profile,
    arodav: arodav as Profile,
};

const root = document.documentElement;

function getProfileKey(): string {
    return root.dataset.profile || "marces";
}

function isHttpUrl(url: string): boolean {
    return /^https?:\/\//i.test(url);
}

function applyLayoutVars(el: HTMLElement, layout?: GridLayout) {
    if (!layout) return;
    el.style.setProperty("--row", String(layout.row));
    el.style.setProperty("--row-span", String(layout.rowSpan));
    el.style.setProperty("--col", String(layout.col));
    el.style.setProperty("--col-span", String(layout.colSpan));
}

function renderName(profile: Profile) {
    const el = document.querySelector<HTMLElement>("[data-profile-name]");
    if (!el) return;
    el.textContent = profile.name;
}

function renderTagline(profile: Profile) {
    const el = document.querySelector<HTMLElement>("[data-profile-tagline]");
    if (!el) return;
    el.textContent = profile.tagline;
}

function renderAvatar(profile: Profile) {
    const img = document.querySelector<HTMLImageElement>(".profile__avatar-img");
    if (!img) return;
    img.src = profile.avatar;
    img.alt = `Imagen de perfil de ${profile.name}`;
}

function createCardItem(item: LinkCard): HTMLLIElement {
    const li = document.createElement("li");
    li.className = `links__item${item.variant ? ` links__item--${item.variant}` : ""}`;

    applyLayoutVars(li, item.layout);

    const a = document.createElement("a");
    a.className = `links__card${item.variant ? ` links__card--${item.variant}` : ""}`;
    a.href = item.url;

    if (isHttpUrl(item.url)) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
    }

    const icon = document.createElement("img");
    icon.className = "links__icon-img";
    icon.src = item.icon;
    icon.alt = "";
    icon.setAttribute("aria-hidden", "true");

    const label = document.createElement("span");
    label.className = "links__label";
    label.textContent = item.label;

    a.append(icon, label);
    li.appendChild(a);
    return li;
}

function createDockItem(dock: LinkDock): HTMLLIElement {
    const li = document.createElement("li");
    li.className = "links__item links__item--dock";

    applyLayoutVars(li, dock.layout);

    const nav = document.createElement("nav");
    nav.className = "links__dock";
    nav.setAttribute("aria-label", "Enlaces rápidos");

    dock.items.forEach((d) => {
        const a = document.createElement("a");
        a.className = "links__dock-link";
        a.href = d.url;
        a.title = d.label;
        a.setAttribute("aria-label", d.label);

        if (isHttpUrl(d.url)) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        }

        const icon = document.createElement("img");
        icon.className = "links__dock-icon-img";
        icon.src = d.icon;
        icon.alt = "";
        icon.setAttribute("aria-hidden", "true");

        a.appendChild(icon);
        nav.appendChild(a);
    });

    li.appendChild(nav);
    return li;
}

function renderLinks(profile: Profile) {
    const grid = document.querySelector<HTMLUListElement>("[data-links-grid]");
    if (!grid) return;

    grid.innerHTML = "";

    for (const item of profile.links) {
        if ("variant" in item && item.variant === "dock") {
        grid.appendChild(createDockItem(item));
        } else {
        grid.appendChild(createCardItem(item));
        }
    }

    if (profile.dockLinks?.length) {
        const dockFallback: LinkDock = {
        variant: "dock",
        layout: { row: 6, rowSpan: 1, col: 1, colSpan: 5 },
        items: profile.dockLinks,
        };
        grid.appendChild(createDockItem(dockFallback));
    }
}

function init() {
    const key = getProfileKey();
    const data = PROFILES[key];

    if (!data) {
        console.warn("Perfil no encontrado:", key);
        return;
    }

    renderAvatar(data);
    renderName(data);
    renderTagline(data);
    renderLinks(data);
}

init();
