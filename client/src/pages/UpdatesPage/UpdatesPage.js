import React from "react";

import "./UpdatePage.scss";

const UPDATES = [
    {
        examTopic: "nigga",
        recruiter: "elsisi",
        jobTitile: "zbal",
        img: "https://a.allegroimg.com/original/115895/b594fa094f3288495c442ac555f5/KLOCKI-HAM-BMW-T-E60-E61-VALEO-Typ-samochodu-Samochody-osobowe"
    }
];

const UpdatesPage = (props) => {
    return (
        <div className="c">
            <h3 className="hh3">Your Updates</h3>
            <div className="updates">
                <div className="update">
                    <img
                        src="https://a.allegroimg.com/original/115895/b594fa094f3288495c442ac555f5/KLOCKI-HAM-BMW-T-E60-E61-VALEO-Typ-samochodu-Samochody-osobowe"
                        alt="logo"
                        className="immg"
                    />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Explicabo in enim consequuntur incidunt iure non. Nisi,
                        est iste. Sit, quibusdam!
                    </p>
                </div>
                <div className="update">
                    <img
                        src="https://a.allegroimg.com/original/115895/b594fa094f3288495c442ac555f5/KLOCKI-HAM-BMW-T-E60-E61-VALEO-Typ-samochodu-Samochody-osobowe"
                        alt="logo"
                        className="immg"
                    />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Explicabo in enim consequuntur incidunt iure non. Nisi,
                        est iste. Sit, quibusdam!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UpdatesPage;
