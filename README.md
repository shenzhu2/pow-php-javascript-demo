# pow-php-javascript-demo

This repository is proof of concept that implement proof of work system in PHP and javascript.

## Screenshots

### Server web deny content for customer request without submit proof of work solution

![Server web deny content for customer request without submit proof of work solution](screenshots/0.png?raw=true "/pow-walled-content.php")

### Customer solve proof of work at 207 hash/sec

![Customer solve proof of work at 207 hash/sec](screenshots/1.png?raw=true "/solve-pow.php")

### Customer submit proof of work solution and server web accept

[Customer submit proof of work solution and server web accept](screenshots/2.png?raw=true "/solve-pow.php")

### Server web show content for customer with submit proof of work solution

![Server web show content for customer with submit proof of work solution](screenshots/3.png?raw=true "/pow-walled-content.php")

## Getting Started

Drop the files contained in this repository in server (example /var/www) and configure your server web with new virtual host with document root is the `htdocs` directory of this repository. It notice that want `settings.php` be locate outside document root.

## Hash function

Pass the values (in order) to SHA256 twice, like bitcoin

1. hostname - the hostname of your server `$_SERVER['HTTP_HOST']`
2. timestamp - a current iso-8601 timestamp in UTC
3. rand - the random string put by the server and stored to `$_SESSION['pow']['rand']`
4. counter - a nonce that is incremented until the hash satisfies the difficulty

## Prevent cheater customer

Cheater customer prevent by

1. Store difficulty in server variable of session PHP
2. Check customer specific random number in server variable of session PHP
3. Check solution use timestamp less than 1 old hour

## Limitation

Javascript very slow. Cheater customer write C program and solve and submit solution server web many many fast than use javascript in this repository.

Wasm better. See https://github.com/shenzhu2/pow-php-wasm-demo

## Donate

If demo help you please make donation at monero address

```
4ATt62EMG6KGW6EnehvnJJABd75RavSxZY367JCb3QWzKZJzbjHexkuYQA3TwJznz1F8NgqzrgPKQ6vnxuYEpSYVMfuLEo9
```

Thank you!

## Authors

* **Shen Zhu <shenzhu@cock.li>** - 54BE 8C1D 9BC3 CD9A 554E  DD69 DA4C CB93 9EB8 AAD4 - https://github.com/shenzhu2
* **Chris Veness** - https://github.com/chrisveness/crypto

## License

This project is license with AGPL License. See [LICENSE](LICENSE)

