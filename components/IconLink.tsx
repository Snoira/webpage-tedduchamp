import type { ReactElement } from 'react';

interface IconLinkProps {
    closeNavFunc?: () => void;
    url: string;
    platform: 'instagram' | 'spotify' | 'youtube' | 'tiktok';
}

const Icons = {
    "instagram": (
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor">
                <path strokeLinejoin="round" strokeWidth="1.5" d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12Z" />
                <path strokeWidth="1.5" d="M16.5 12a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.508 6.5h-.01" />
            </g>
        </svg>
    ),
    "spotify": (
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" d="M7.5 12.069c1.1-.37 2.276-.569 3.5-.569c2.024 0 3.92.547 5.549 1.5M18 10c-1.85-1.262-4.088-2-6.5-2c-1.597 0-3.118.324-4.5.908M15.129 16a9.04 9.04 0 0 0-6.497-.685" />
            </g>
        </svg>
    ),
    "youtube": (
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 20.5c1.81 0 3.545-.179 5.153-.507c2.01-.41 3.014-.614 3.93-1.792c.917-1.179.917-2.532.917-5.238v-1.926c0-2.706 0-4.06-.917-5.238c-.916-1.178-1.92-1.383-3.93-1.792A26 26 0 0 0 12 3.5c-1.81 0-3.545.179-5.153.507c-2.01.41-3.014.614-3.93 1.792C2 6.978 2 8.331 2 11.037v1.926c0 2.706 0 4.06.917 5.238c.916 1.178 1.92 1.383 3.93 1.792c1.608.328 3.343.507 5.153.507Z" />
                <path strokeLinejoin="round" d="M15.962 12.313c-.148.606-.938 1.04-2.517 1.911c-1.718.947-2.577 1.42-3.272 1.237a1.7 1.7 0 0 1-.635-.317C9 14.709 9 13.806 9 12s0-2.709.538-3.144c.182-.147.4-.256.635-.317c.695-.183 1.554.29 3.272 1.237c1.58.87 2.369 1.305 2.517 1.911c.05.206.05.42 0 .626Z" />
            </g>
        </svg>
    ),
    "tiktok": (
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5">
                <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12Z" />
                <path strokeLinecap="round" d="M10.536 11.008c-.82-.116-2.69.075-3.606 1.77s.007 3.459.584 4.129c.569.627 2.378 1.814 4.297.655c.476-.287 1.069-.502 1.741-2.747l-.078-8.834c-.13.973.945 3.255 4.004 3.525" />
            </g>
        </svg>
    ),
};

export default function IconLink({ url, platform, closeNavFunc }: IconLinkProps): ReactElement {
    const iconKey = platform && platform in Icons ? platform : "instagram";

    return (
        <a
            href={url ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:text-primary hover:scale-110 focus:text-primary transition-all duration-300 ease-in-out"
            onClick={() => { closeNavFunc ? closeNavFunc() : null }}
        >
            {Icons[iconKey as keyof typeof Icons]}
        </a>
    );
}