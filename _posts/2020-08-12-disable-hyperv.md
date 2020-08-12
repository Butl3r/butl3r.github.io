---
layout: post
title: Toggle Hyper-V on Windows 10 Desktop
date: 2020-08-12
preview: Toggle Hyper-V on Windows 10 to allow Virtualbox and VMware player to run without issues
categories: 
    - "general"
    - "commands"
---

# Background

With Hyper-V enabled on Windows 10, you are generally not able to run other type 2 hypervisors (Hosted i.e. On top of Windows 10) such as 
VirtualBox or VMware player/workstation. The below commands can toggle Hyper-V on Windows 10 (*reboot required) to allow you to run
these alternative virtualisation solutions.

## Turn Off

```powershell
bcdedit /set hypervisorlaunchtype off
```

## Turn On
```powershell
bcdedit /set hypervisorlaunchtype auto
```

