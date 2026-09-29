import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';

import type { SocialLink } from './community.d';

export const defaultSocialLinks: SocialLink[] = [
  {
    name: 'Instagram',
    icon: <FaInstagram className="size-5" />,
    url: 'https://www.instagram.com/sylvorn.labs',
  },
  {
    name: 'LinkedIn',
    icon: <FaLinkedin className="size-5" />,
    url: 'https://www.linkedin.com/company/sylvorn-labs',
  },
  {
    name: 'X',
    icon: <FaXTwitter className="size-5" />,
    url: 'https://x.com/sylvorn_labs',
  },
  {
    name: 'YouTube',
    icon: <FaYoutube className="size-5" />,
    url: 'http://www.youtube.com/@sylvorn_labs',
  },
  {
    name: 'GitHub',
    icon: <FaGithub className="size-5" />,
    url: 'https://github.com/sylvorn-labs',
  },
];
