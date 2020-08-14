---
layout: commands
title: HTTP/S Enumeration Cheatsheet
date: 2020-08-10
preview: Cheatsheet for HTTP enumeration for active scanning a website
categories: 
    - "commands"
    - "pentest"
    - "enumeration"
---

# Screenshot

```bash
cutycapt --url=$TARGETURL --out=fileout.png
```

# Directory Scanning

## Dirb

```bash
dirb http://$TARGETIP | tee -a dirb.txt
```

## Nikto

```bash
nikto -host http://$TARGETIP | tee -a nikto.txt
```

```bash
nikto -ssl -port <PORT> -host $TARGETIP | tee -a nikto-ssl.txt
```
## GoBuster

```bash
gobuster dir -u http://$TARGETIP -w /usr/share/dirbuster/wordlists/directory-list-2.3-medium.txt \
| tee -a gobuster-common.txt
```

```bash
gobuster dir -k -u https://$TARGETIP -w /usr/share/dirbuster/wordlists/directory-list-2.3-medium.txt \
| tee -a gobuster-common.txt
```

```bash
gobuster dns -u http://$TARGETIP -w list.txt | tee -a gobuster-dns-list.txt
```

```bash
gobuster dns -k -u https://$TARGETIP -w list.txt | tee -a gobuster-dns-list.txt
```

```bash
gobuster vhost -u http://$TARGETIP -w list.txt | tee -a gobuster-vhost-list.txt
```

```bash
gobuster vhost -k -u https://$TARGETIP -w list.txt | tee -a gobuster-vhost-list.txt
```

## Dirsearch

```bash
dirsearch.py -u http://$TARGETIP -e txt,html,php | tee -a dirsearch.txt
```

```bash
dirsearch.py -u http://$TARGETURL -e txt,html,php -
-w /usr/share/dirbuster/wordlists/directory-list-2.3-medium.txt -t 100 
| tee -a dirsearch.txt
```

## WFUZZ

```bash
wfuzz -w /usr/share/dirb/wordlists/common.txt http://TARGETIP/FUZZ.php
```

```bash
wfuzz -hc 404 -c -z list,admin -z file,/path/to/wordlist.txt -d "user=FUZZ&password=FUZ2Z" \
http://TARGETIP/path
```

```bash
wfuzz -c --ntlm "username:FUZZ" -z file,/path/to/wordlist.txt -hc 401 http://$TARGETIP/path
```

```bash
wfuzz -c -hc 404400,401 -z file,/path/to/usernames.txt -z file,/path/to/wordlist.txt \
--basic "FUZZ:FUZ2Z" -p 127.0.0.1:8080 http://TARGETIP/path
```

[https://wfuzz.readthedocs.io/en/latest/user/basicusage.html](https://wfuzz.readthedocs.io/en/latest/user/basicusage.html)

# Wordlist

## Common

```bash
/usr/share/dirb/wordlists/common.txt
```

```bash
/usr/share/dirbuster/wordlists/directory-list-2.3-medium.txt
```

## Build

```bash
cewl -d 2 http://$TARGETIP > wordlist.txt
```

# Feature Scan

## Webdav

```bash
davtest -url http://$TARGETIP/ -cleanup | tee -a davtest.txt
```

```bash
cadaver http://$TARGETIP
```

## Drupal

```bash
droopescan scan drupal -u http://<URL>
```

## Joomla

```bash
joomscan -h http://$TARGETIP
```