### Types of SSL authentication

**1. One-way SSL authentication** allows a SSL client to confirm an identity of SSL server. This kind of SSL authentication is used by HTTPS protocol and many public servers around the world this way provides services such as webmail or internet banking. 

The SSL client authentication is done on a "application layer" of OSI model by the client entering an authentication credentials such as username and password or by using a grid card.

**2. Two-way SSL authentication** also know as mutual SSL authentication allow SSL client to confirm an identity of SSL server and SSL server can also confirm an identity of the SSL client. 

This type of authentication is called client authentication because SSL show its identity to SSL server with use of the client certificate. Client authentication with a certificate can add yet another layer of security or even completely replace authentication method such us username and password.



### References

- [\[PRACTICE\] Apache Web Server Authentication](https://linuxconfig.org/apache-web-server-ssl-authentication)
- [HTTPS client certificate authentication security issues. Part 1/3](https://d0znpp.medium.com/https-client-certificate-authentication-security-issues-part-1-3-ae59514357b1)
- [HTTPS client certificate authentication security issues. Part 2/3](https://d0znpp.medium.com/https-client-certificate-authentication-security-issues-part-2-3-5a19367cc698)

