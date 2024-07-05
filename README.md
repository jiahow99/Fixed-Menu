## Description

Laravel nova package to fix sidebar when scroll, and make horizontal table scroll.

## Installation

You can install this package via Composer. Run the following command:

```bash
composer require mices/fixed-menu
```

## Register class to your App\Providers\NovaServiceProvide

```php
use Mices\FixedMenu\FixedMenu;

public function tools()
{
    return [
        new FixedMenu,
    ];
}
```

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Contact

Liong Kah How - jia_how99@hotmail.com

