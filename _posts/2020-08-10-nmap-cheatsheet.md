---
layout: commands
title: NMAP Cheatsheet
date: 2020-08-10
preview: Cheatsheet of NMAP commands for active scanning a target
categories: 
    - "commands"
    - "pentest"
    - "enumeration"
---

NMAP active reconnaissance against target machine.

# Port Scan

## Initial

```bash
nmap -sC -sV -oA nmap/initial -vvv $TARGETIP | tee -a nmap.initial.txt
```

## Syn scan

```bash
nmap -sS -p- -vvv $TARGETIP | tee -a nmap.tcpsyn.allports.txt
```

## TCP Ack

```bash
nmap -sA -p- -vvv $TARGETIP | tee -a nmap.tcpsyn.allports.txt
```

## Scan all TCP Ports

```bash
nmap -sT -p- -vvv $TARGETIP | tee -a nmap.tcp.allports.txt
```

## Scan all UDP Ports

```bash
nmap -sU -p- -vvv $TARGETIP | tee -a nmap.udp.allports.txt
```

## Top 100 TCP Ports

```bash
nmap -vvv -sT --top-ports 100 $TARGETIP | tee -a nmap.tcp.top100.txt
```

## Version of service

```bash
nmap -vvv -sV $TARGETIP | tee -a nmap.tcp.serviceversion.txt
```

## OS Version Detection

```bash
nmap -vvv -A $TARGETIP | tee -a nmap.tcp.serviceversion.txt
```

## Performance

```bash
-T0 - Paranoid (0) Intrusion Detection System evasion
-T1 - Sneaky (1) Intrusion Detection System evasion
-T2 - Polite (2) slows down the scan to use less bandwidth and use less target machine resources
-T3 - Normal (3) which is default speed 
-T4 - Aggressive (4) speeds scans; assumes you are on a reasonably fast and reliable network 
-T5 - Insane (5) speeds scan; assumes you are on an extraordinarily fast network
```

## SNMP

```bash
nmap -sU --open -p161 $TARGETIP --open | tee -a nmap.snmp.open.txt
```

# Vulnerability Scanning

## FTP

### Anonymous

```bash
nmap -p 21 -script ftp-anon.nse $TARGETIP | tee -a nmap.ftp.anon.txt
```

## HTTP/HTTPS

### Heartbleed

```bash
nmap -p 443 -script ssl-heartbleed $TARGETIP | tee -a nmap.heartbleed.https.txt
```

### Shellshock

```bash
nmap $TARGETIP -p <PORT> --script=http-shellshock --script-args uri=<URI PATH> 
| tee -a nmap.http.shellshock.txt
```

## SMB

### Enumerate users

```bash
nmap -p139,445 --script smb-enum-users $TARGETIP | tee -a nmap.smb.enumusers.txt
```

### Safe scripts

```bash
nmap -p139,445 --script safe $TARGETIP | tee -a nmap.smb.safe.out.txt
```

### Scan for all SMB vulnerabilities **Unsafe

```bash
nmap -p139,445 --script=smb-vuln-* --script-args=unsafe=1 $TARGETIP | tee -a nmap.smb.vulns.txt
```

### Eternal Blue

```bash
nmap --script smb-vuln-ms17-010 -p139,445 $TARGETIP | tee -a nmap.smb.ms17-010.out.txt
```

## NFS

### Show NFS details as ls output
```bash
nmap -sV --script=nfs-ls $TARGETIP | tee -a nmap.nfs.txt
```

### Show NFS mounts

```bash
nmap -sV --script=nfs-showmount $TARGETIP | tee -a nmap.nfs.mount.tx
```

## RDP

### CredSSP

```bash
nmap -p 3389 --script rdp-enum-encryption $TARGETIP | tee -a nmap.rdp.credssp.txt
```

### MS12-020

```bash
nmap -p 3389 --script rdp-vuln-ms12-020 $TARGETIP | tee -a nmap.rdp.ms12-020.txt
```

## VNC

### Auth Bypass
```bash
nmap -p 5900 --script=realvnc-auth-bypass $TARGETIP | tee -a nmap.vnc.authbypass.txt
```

### Brute force
```bash
nmap -p 5900 --script=vnc-brute $TARGETIP | tee -a nmap.vnc.bruteforce.txt
```

### VNC Info

```bash
nmap -p 5900 --script=vnc-info $TARGETIP | tee -a nmap.vnc.info.txt
```

### VNC Verson

```bash
nmap -p 5900 --script=vnc-title $TARGETIP | tee -a nmap.vnc.title.txt
```

## SQL

### Oracle

```bash
nmap --script oracle-tns-version $TARGETIP -p 1521 | tee -a nmap.oracle.tns.txt
nmap --script=oracle-sid-brute -p 1521 $TARGETIP | tee -a nmap.oracle.sid.txt
nmap --script=oracle-brute -p 1521 $TARGETIP | tee -a nmap.oracle.brute.txt
```

### MS SQL

```bash
nmap -sU --script=ms-sql-info $TARGETIP | tee -a nmap.mssql.txt
```
