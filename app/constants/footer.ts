import {
    FacebookIcon,
    TwitterIcon,
    InstagramIcon,
    YoutubeIcon,
    LinkedinIcon
} from 'lucide-vue-next';
import { routes, socialsLinks, legalLinkRoutes } from '~/constants/routes';

export const listSocial = [
    {
        icon: FacebookIcon,
        title: 'Facebook',
        link: socialsLinks.facebook
    },
    {
        icon: TwitterIcon,
        title: 'Twitter',
        link: socialsLinks.twitter
    },
    {
        icon: InstagramIcon,
        title: 'Instagram',
        link: socialsLinks.instagram
    },
    {
        icon: YoutubeIcon,
        title: 'Youtube',
        link: socialsLinks.youtube
    },
    {
        icon: LinkedinIcon,
        title: 'LinkedIn',
        link: socialsLinks.linkedin
    }
];

interface FooterLink {
    text: string;
    to?: string;
    href?: string;
}

export const listMenuFooter: { title: string; links: FooterLink[] }[] = [
    {
        title: 'Quick Links',
        links: [
            { text: 'Tournaments', to: routes.tournaments },
            { text: 'Games', to: routes.games },
            { text: 'Teams', to: routes.teams },
            { text: 'FAQ', to: routes.faq }
        ]
    },
    {
        title: 'Explore',
        links: [
            { text: 'Top Players', to: routes.topPlayers },
            { text: 'Messages', to: routes.chat },
            { text: 'Profile', to: routes.profile }
        ]
    },
    {
        title: 'Follow Us',
        links: [
            { text: 'Facebook', href: socialsLinks.facebook },
            { text: 'Instagram', href: socialsLinks.instagram },
            { text: 'Twitter', href: socialsLinks.twitter },
            { text: 'LinkedIn', href: socialsLinks.linkedin }
        ]
    }
];

export const legalLinks = [
    {
        title: 'Terms & Conditions',
        to: legalLinkRoutes.terms
    },
    {
        title: 'Privacy Policy',
        to: legalLinkRoutes.privacy
    }
];
