import {
    HandFistIcon,
    CoinsIcon,
    PencilRulerIcon,
    DatabaseIcon,
    ScaleIcon,
    ReceiptTextIcon
} from 'lucide-vue-next';
import { routes } from '~/constants/routes';

export const listLevels = [
    {
        icon: HandFistIcon,
        title: 'Industry Best Support',
        description:
            'Get a reply in under 90 seconds from our friendly, in-house staff. 24/7.',
        link: routes.supports
    },
    {
        icon: PencilRulerIcon,
        title: 'Play To Earn',
        description:
            'Earn our TXT tokens with every bet you make. TXT tokens can be profits.    ',
        link: routes.playToEarn
    },
    {
        icon: DatabaseIcon,
        title: 'Instant Payouts',
        description:
            'Withdraw easily with instant payouts on over 99.4% withdrawals.',
        link: routes.instantPayouts
    },
    {
        icon: CoinsIcon,
        title: 'Free Withdrawals',
        description:
            'Withdraw easily with instant payouts on over 99.4% withdrawals.',
        link: routes.freeWithdrawals
    },
    {
        icon: ScaleIcon,
        title: 'Prove-able Fairness',
        description:
            'Get a reply in under 90 seconds from our friendly, in-house staff. 24/7.',
        link: routes.fairness
    },
    {
        icon: ReceiptTextIcon,
        title: 'Fully Licensed',
        description:
            'Get a reply in under 90 seconds from our friendly, in-house staff. 24/7.',
        link: routes.license
    }
];
