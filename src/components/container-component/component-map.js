import { AdminHome, Admin1, Admin2, Admin3, Admin4, Admin5, Admin6,
         RecruiterHome, Recruiter1, Recruiter2, Recruiter3, Recruiter4, Recruiter5, Recruiter6 } from'./placeholder-components';
import Login from './login.component'
import React, { Component }  from 'react';
import ApartmentLanding from '../apartment_manager_landing.component';

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
                        {'name': 'Home', 'content': <ApartmentLanding className="ApartmentLandingComponent"></ApartmentLanding>},
                        {'name': 'Apartments', 'content': <ApartmentLanding className="ApartmentLandingComponent"></ApartmentLanding>}
                   ],
        "dropdowns":[],
        "side": {
            "Apartments":[
                {'name': 'Admin Apartments Sidebar Link 1', 'content': <Admin5/>},
                {'name': 'Admin Apartments Sidebar Link 2', 'content': <Admin6/>}
            ],
            "Home":[
                {'name': 'Admin Home Sidebar Link 1', 'content': <Admin5/>},
                {'name': 'Admin Home Sidebar Link 2', 'content': <Admin6/>}
            ]
        }
    }
}