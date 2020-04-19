# Smarthome - Frontend

## Objective

Build a frontend UI for home or office automation system to remotely control devices at home / office via Smarthome Backend.

## Stack

**Language:** Angular 7 _(HTML, SCSS, Typescript)_
**Package Manager:** npm  
 **API Endpoint:** _window.location.hostname:**8080**_  
 **Frameworks & Libraries:**

- **Angular 7** - For App Engine
- **rxjs** - For reactive programming
- **cors** - For Cross-Origin-Resource-Sharing support
- **sweetalert2** - For dialog boxes

**Supported Browser:**

- Chrome (Mac, Linux, Windows, iOS, Android)
- Safari (Mac & iOS)
- Firefox (Mac, Linux, Windows, Android)

**Dev Server Port:** 4200

## Setup

Setup of this project is simple.

1.  Clone the repository
2.  To install the all dependencies, run `npm install`
3.  To start the server in development, run `npm start`  
    **Note:** The above command takes care of building the project also. If you want to just build the application, run `ng build --prod`

## Structure of the App

This app has 3 routes

1.  **/** => _(**Home Route**)_ - Lists currently added devices.
2.  **/discover** => _(**Discover Route**)_ - Lets user search the network and list the devices in the vicinity.
3.  **/device/:uuid** => _(**Control Route**)_ - Lets user control a device specified by the **_uuid_** URI param.

### Home Route

_Path:_ **/**

Lists currently added devices.

Each device is presented as a card with their **_name_**, **_type_**, **_icon_**. Clicking any card takes user to the control route of that device.

This listing has 3 break points (**_small_** - single column, **_medium_** - double column, **_large_** - triple column).

The header has 2 buttons. (**_discover_** - the plus icon, takes user to discover route, **_refresh_** - the circular arrows icon, refreshes the list).

### Discover Route

_Path:_ **/discover**

Lets user search the network and list the devices in the vicinity.

Each device is presented as a card with their **_ip_**, **_service port_**, **_icon_** and a **_add button_**. Clicking add button opens a dialog for the user to enter the name that the user wants to save the device as. If the device is already added, the **_add button_** gets replaced by a **_added tag_**.

This listing has 3 break points (**_small_** - single column, **_medium_** - double column, **_large_** - triple column).

The header has 2 buttons. (**_back_** - the left chevron icon, takes user to previous page, **_refresh_** - the circular arrows icon, refreshes the list). The back button functionality is identical to browser's back button.

### Control Route

_Path:_ **/device/:uuid**

Lets user control a device specified by the **_uuid_** URI param.

Basic info of device is presented as an info card with their **_name_**, **_ip_**, **_service port_**, **_icon_** and a **_edit button_**. Clicking edit button opens a dialog for the user to update the name that the user wants to update the device with.

Below the info card there are device specific control panels.

The header has 2 buttons. (**_back_** - the left chevron icon, takes user to previous page, **_delete_** - the trash bin icon, removes the device from database). The back button functionality is identical to browser's back button.
