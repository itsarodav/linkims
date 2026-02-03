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

function init() {
    const key = getProfileKey();
    const data = PROFILES[key];

    if (!data) {
        console.warn('Perfil no encontrado:', key);
        return;
    }

    renderName(data);
}

init();