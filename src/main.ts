type LinkItem = {
    label: string;
    url: string;
    icon: string;
};

type Profile = {
    avatar: string;
    name: string;
    tagline: string;
    links: LinkItem[];
};

import marces from './profiles/marces/marces.json';
import arodav from './profiles/arodav/arodav.json';

const PROFILES: Record<string, Profile> = {
    marces: marces as Profile,
    arodav: arodav as Profile,
};

const root = document.documentElement;

function getProfileKey(): string {
    return root.dataset.profile || 'marces';
}

function renderName(profile: Profile) {
    const el = document.querySelector('[data-profile-name]');
    if (!el) return;
    el.textContent = profile.name;
}

function renderTagline(profile: Profile) {
    const el = document.querySelector('[data-profile-tagline]');
    if (!el) return;
    el.textContent = profile.tagline;
}

function renderLinks(profile: Profile) {
    const el = document.querySelector('[data-links-grid]');
    if (!el) return;
    
    el.innerHTML = '';

    for (const item of profile.links) {
    const li = document.createElement('li');

    const a = document.createElement('a');
    a.href = item.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = item.label;

    // Icono
    const img = document.createElement('img');
    img.src = item.icon;
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');

    // Orden = icono + texto
    a.prepend(img);
    li.appendChild(a);
    el.appendChild(li);
    }
}

function init() {
    const key = getProfileKey();
    const data = PROFILES[key];

    if (!data) {
        console.warn('Perfil no encontrado:', key);
        return;
    }

    renderName(data);
    renderTagline(data);
    renderLinks(data);
}

init();