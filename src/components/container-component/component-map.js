import { AdminHome, Admin1, Admin2, Admin3, Admin4, Admin5, Admin6,
         RecruiterHome, Recruiter1, Recruiter2, Recruiter3, Recruiter4, Recruiter5, Recruiter6 } from'./placeholder-components';
import Login from './login.component'
import React, { Component }  from 'react';
import ApartmentLanding from '../apartment_manager_landing.component';




let func = function(x){console.log(x)}


export const myConfig =
{
    "null": <Login/>,
    "recruiter": {
        "home": <RecruiterHome/>,
        "buttons": [
                        {'name': 'Home', 'content': <RecruiterHome/>}
                   ],
        "dropdowns":[
                        {   'name': 'Bursary',
                            'content':[
                                        {'name': 'Recruiter Bursary Link 1', 'content': <Recruiter1/>},
                                        {'name': 'Recruiter Bursary Link 2', 'content': <Recruiter2/>}
                                    ]
                        },
                        {  'name': 'Apartments',
                           'content':[
                                        {'name': 'Recruiter Apartment Link 1', 'content': <Recruiter3/>},
                                        {'name': 'Recruiter Apartment Link 2', 'content': <Recruiter4/>}
                                    ]
                        }
                    ],
        "side": [
                        {'name': 'Recruiter SideBar Link 1', 'content': <Recruiter5/>},
                        {'name': 'Recruiter SiderBar Link 2', 'content': <Recruiter6/>}
                   ],
    },
    "admin": {
        "home": <ApartmentLanding className="ApartmentLandingComponent"></ApartmentLanding>,
        "buttons": [
                        {'name': 'Home', 'content': <ApartmentLanding className="ApartmentLandingComponent"></ApartmentLanding>}
                   ],
        "dropdowns":[
                        {   'name': 'Demo Dropdown',
                            'content':[
                                        {'name': 'Admin placeholder 1', 'content':<AdminHome id="helloworld"/>},
                                        {'name': 'Admin placeholder 2', 'content':<Admin1/>},
                                        {'name': 'Admin placeholder 3', 'content': <Admin2/>},
                                        {'name': 'Admin placeholder 4', 'content': <Admin3/>},
                                        {'name': 'Admin placeholder 5', 'content': <Admin4/>}
                                      ]
                        }
                    ],
        "side": [
                        {'name': 'Admin Sidebar Link 1', 'content': <Admin5/>},
                        {'name': 'Admin Sidebar Link 2', 'content': <Admin6/>}
                   ],
    }
}