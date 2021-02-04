## SSL Checklist for Pentester
- [SSL/TLS Vulnerabilities book.hacktricks.xyz](https://book.hacktricks.xyz/pentesting/pentesting-web#step-by-step-web-application-testing)
- [SSL Checklist for Pentester by Jeromy Smith (2014)](https://research.nccgroup.com/wp-content/uploads/2020/07/ssl-checklist-for-pentesters-bsides-mcr.pdf)
- [Awesome SSL/TLS Hacks](https://github.com/lennysec/awesome-tls-hacks)

## General Tools
- [nmap](https://www.tenable.com/products/nessus)
- [sslyze](https://github.com/nabla-c0d3/sslyze)
- [ssllabs](https://www.ssllabs.com/ssltest/)
- [testssl.sh](https://github.com/drwetter/testssl.sh)
- [a2sv](https://github.com/hahwul/a2sv)
- [nessus](https://www.tenable.com/products/nessus)

## Details Vulnerabilities

### Padding Oracle On Downgraded Legacy Encryption (POODLE)

- [What Is the POODLE Attack?](https://www.acunetix.com/blog/web-security-zone/what-is-poodle-attack/)
- [POODLE Attack Explained](https://medium.com/@c0D3M/poodle-attack-explained-ed6a1cd0667d)
- [This POODLE Bites: Exploiting The SSL 3.0 Fallback](https://www.openssl.org/~bodo/ssl-poodle.pdf)
- [\[VIDEO\] SSLv3 Poodle Vulnerability | Password theft](https://www.youtube.com/watch?v=BbwC8f_aBMQ)

```
nmap -sV --version-light --script ssl-poodle -p 443 <host>
```

Other tools:

- [POODLEAttack](https://github.com/thomaspatzke/POODLEAttack) 
- [poodle](https://github.com/SteffeyDev/poodle)

### Weak Diffie-Hellman and the Logjam Attack

- [Diffie–Hellman key exchange](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange)
- [Weak Diffie-Hellman and the Logjam Attack](https://weakdh.org/)
- [LogJam Attack Explained](https://medium.com/@c0D3M/logjam-attack-explained-829d62d951a6)
- [Breaking down the Logjam (vulnerability)](https://blog.rapid7.com/2015/05/22/breaking-down-the-logjam-vulnerability/)
- [How to test Logjam Attack (CVE-2015-4000) and fix?](https://geekflare.com/test-logjam-attack-cve-2015-4000-and-fix)
- [Guide to Deploying Diffie-Hellman for TLS (Weak Diffie-Hellman and the Logjam Attack)](https://blog.yucas.net/2018/01/29/guide-to-deploying-diffie-hellman-for-tls-weak-diffie-hellman-and-the-logjam-attack/)
- [[LAB] SSH-Weak-DH](https://github.com/AonCyberLabs/SSH-Weak-DH)

```
nmap --script ssl-dh-params <target>
```

Other tools:

- [logjam-attack-poc](https://github.com/concise/logjam-attack-poc)

### Factoring RSA Export Keys (FREAK)

- [FREAK Attack Explained](https://medium.com/@c0D3M/freak-attack-explained-3048ab9d3f30)
- [How to test FREAK Attack (CVE-2015-0204) and Fix?](https://geekflare.com/test-freak-attack-cve-2015-0204-and-fix/)
- [FREAK Attack: What You Need to Know](https://www.digicert.com/dc/blog/freak-attack-need-know/)

```
nmap -p 443 --script ssl-enum-ciphers <target>
```

Other tools:

- [FREAK-Attack-CVE-2015-0204-Testing-Script](https://github.com/AbhishekGhosh/FREAK-Attack-CVE-2015-0204-Testing-Script)
- [Scanning for FREAK with nmap](https://www.vanstechelman.eu/content/scan-for-freak-using-nmap)


### HeartBleed

- [The Heartbleed Bug](https://heartbleed.com/)
- [HeartBleed Attack Explained](https://medium.com/@c0D3M/heartbleed-attack-explained-3bf796e8be61)
- [xkcd Heartbleed](https://xkcd.com/1354/)

```
nmap -p 443 --script ssl-heartbleed <target>
```

Other tools:

- [heartbleed.py](https://gist.github.com/eelsivart/10174134)

### Lucky Thirteen

- [Lucky 13 Attack Explained](https://medium.com/@c0D3M/lucky-13-attack-explained-dd9a9fd42fa6)
- [TLS/SSL Timing Side-Channel Attacks, aka the "Lucky Thirteen" Attack](https://www.rapid7.com/db/vulnerabilities/ssl-cbc-ciphers/)
- [Lucky Thirteen: Breaking the TLS and DTLS Record Protocols](http://www.isg.rhul.ac.uk/tls/Lucky13.html)


Other tools:

- [lucky13](https://github.com/jakemco/lucky13)

### Browser Exploit Against SSL/TLS (BEAST)

- [What Is the BEAST Attack](https://www.acunetix.com/blog/web-security-zone/what-is-beast-attack/)
- [How the BEAST Attack Works](https://www.netsparker.com/blog/web-security/how-the-beast-attack-works/)
- [BEAST Attack Explained](https://medium.com/@c0D3M/beast-attack-explained-f272acd7996e)

Other tools:

- [BEAST-exploit](https://github.com/yaoyi2008/BEAST-exploit)

### Return of Bleichenbacher's Oracle Threat (ROBOT) 

- [The ROBOT Attack](https://robotattack.org/)
- [Bleichenbacher Attack Explained](https://medium.com/@c0D3M/bleichenbacher-attack-explained-bc630f88ff25)

Other tools:

- [robot-detect](https://github.com/robotattackorg/robot-detect)

### RC4

- [Attacking SSL when using RC4](https://www.imperva.com/docs/HII_Attacking_SSL_when_using_RC4.pdf)
- [RC4 NOMORE](https://www.rc4nomore.com/)

Other tools:

- [CRIME-poc](https://github.com/mpgn/CRIME-poc)


### SWEET32

- [Sweet32: Birthday attacks on 64-bit block ciphers in TLS and OpenVPN](https://sweet32.info/)
- [TLS/SSL Sweet32 attack](https://www.acunetix.com/vulnerabilities/web/tls-ssl-sweet32-attack/)

Other tools:

- [sour16](https://github.com/azeemba/sour16)

###  TLS Outdated

- [Why It’s Dangerous to Use Outdated TLS Security Protocols](https://www.venafi.com/blog/why-its-dangerous-use-outdated-tls-security-protocols)

```
nmap.exe -p 443 --script ssl-enum-ciphers <target>
```

Other tools:

- [TLS-Check](https://github.com/tls-check/TLS-Check)

