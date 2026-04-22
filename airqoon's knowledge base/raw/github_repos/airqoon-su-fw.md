# Smart IoT Modules (SMs) - Firmware
![Build Status](http://52.25.123.72/app/rest/builds/buildType%3A%28id%3ASmartModuleFirmware%5FBuild%29/statusIcon)

## Module Application
Module application manages core functions of SMs. Initialization, application configuration handling, regular operation, management are handled with this state machine.

### State Machine
![](https://www.lucidchart.com/publicSegments/view/42ad5d48-8356-4b13-8c1a-3919eca421af/image.png)
#### Initialize Module (Init MCU)

#### Application Configuration (Config APP)

#### Regular Operation

##### Regular Operation State Machine

###### Reg-OP Housekeeping

###### REG-OP 
### Manager

## Cloud Communication Client

### State Machine

## Local Communication Client


## OTA Procedure ( RPC + Attribute + FTP)

Over-the-air (OTA) update procedure is one of the key features of Inovatink Smart IoT Modules (SMs). Inovatink can update firmware of a device deployed to the field whenever necessary. 

Components that are used in this procedure are as follows:
- RPC: To pass FTP credentials & OTA parameters to the device and to initiate the procedure
- FTP: To store and serve new firmware to the device
- Attribute: A Client attribute is used as an indication for the current version of the firmware


A two-way RPC command is issued using RPC widget and this publishes to the `v1/devices/me/rpc/request/<request-id>` topic following message : 
```json
{  
	"method":"OTARequired",  
	"params":{  
		"FTP_IP":<ftp-ip>,  
		"FTP_USER":<ftp-user>,  
		"FTP_PASS":<ftp-pass>,  
		"FTP_PATH":<ftp-path>,  
		"FTP_FW_NAME":<fw-name>  
	}  
}
``` 
 Due to the two-way nature of this command it also expects response from the device within a certain timeout. This timeout can be changed from the settings of the OTA widget. Further requests cannot be issued until a response is received from the target device.

Target device subscribes `v1/devices/me/rpc/request/+` topic and receives the message given above. It publishes a response message to the `v1/devices/me/rpc/response/<request-id>` topic. Then it parses incoming message and configures itself for the OTA procedure. It connects with the given credentials to the FTP server in order to download updated firmware to the RAM of the GSM Module.

After the download, target device starts reading the firmware from UART and writing it to its flash. During this r/w operation, firmware crc is also calculated by esp-ota component. If something unexpected happens, it stops the operation and restarts itself. After successfully writing the firmware image to the intended place in the flash memory, target device changes its boot partition and restarts to boot itself with the new firmware.

When the target device boots with the updated firmware, it updates client attribute "fw_version" by publishing
```json 
{
	"fw_version":<fw-version>
}
```
message to the `v1/devices/me/attributes` topic.

####Readme TODO:
- Attribute Update