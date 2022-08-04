import { Currency } from '@/types/Currency';

const DEFAULT_TOKENS: Currency[] = [ 
  {
    'name': 'ASA',
    'symbol': 'ASA',
    'address': '0x4fDC1FB9C36c855316bA66aAF2dc34aEfd680533',
    'chainId': 11115,
    'decimals': 18,
    'logoURI': 'https://salt.tikicdn.com/ts/upload/87/4c/61/222e62fdd14e6b76189017f97f5101ed.png'  
  },
  {
    'name': 'Tether USD',
    'symbol': 'USDT',
    'address': '0xf8B0c22089C5EE643A5bA475656Ca32Daf48eEcb',
    'chainId': 11115,
    'decimals': 18,
    'logoURI': 'https://pancakeswap.finance/images/tokens/0x55d398326f99059fF775485246999027B3197955.png'
  }
];

export {DEFAULT_TOKENS};