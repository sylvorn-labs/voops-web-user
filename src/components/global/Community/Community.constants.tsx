import { FaDiscord, FaGithub, FaXTwitter } from 'react-icons/fa6';

import type { SocialLink } from './Community.d';

export const defaultSocialLinks: SocialLink[] = [
  {
    name: 'X (Twitter)',
    icon: <FaXTwitter className="size-5" />,
    url: 'https://x.com/sylvornlabs',
  },
  {
    name: 'GitHub',
    icon: <FaGithub className="size-5" />,
    url: 'https://github.com/Sylvorn-Labs/voops-web-user',
  },
  {
    name: 'Discord',
    icon: <FaDiscord className="size-5" />,
    url: 'https://discord.gg',
  },
];
