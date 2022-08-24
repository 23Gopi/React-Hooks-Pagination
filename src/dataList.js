import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import 'bootstrap/dist/css/bootstrap.min.css';
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import paginationFactory from "react-bootstrap-table2-paginator";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

function DataList() {
    const [dataLists, setDataLists] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setperPage] = useState(80);

    const columns = [
        { dataField: 'id', text: 'Id' },
        { dataField: 'name', text: 'Name', filter: textFilter() },
        { dataField: 'tagline', text: 'Tagline', filter: textFilter() },
        { dataField: 'first_brewed', text: 'First_brewed' },
        { dataField: 'description', text: 'Description' },
        { dataField: 'brewers_tips', text: 'Brewers_tips' },
        { dataField: 'contributed_by', text: 'Contributed_by', filter: textFilter() },
        { dataField: 'attenuation_level', text: 'Attenuation_level', filter: textFilter() }
    ];

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 10,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function (page, perPage) {
            console.log("Page", page);
            console.log("PerPage", perPage);
        },
        onSizePerPageChange: function (page, perPage) {
            console.log("Page", page);
            console.log("PerPage", perPage);
        }
    });



    useEffect(() => {
        fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`)
            .then(res => res.json())
            .then(result => setDataLists(result))
            .catch(err => console.log(err));
    }, []);

    return <div>
        <BootstrapTable keyField='id' columns={columns} data={dataLists} pagination={pagination} filter={filterFactory()} />
    </div>
}

export default DataList;