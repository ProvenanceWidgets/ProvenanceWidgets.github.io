import OriginalComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import SiteVersionNavbarLink from '@site/src/components/SiteVersionNavbarLink';

import type {ComponentTypesObject} from '@theme/NavbarItem/ComponentTypes';

const ComponentTypes: ComponentTypesObject = {
  ...OriginalComponentTypes,
  'custom-siteVersionLink': SiteVersionNavbarLink,
};

export default ComponentTypes;
