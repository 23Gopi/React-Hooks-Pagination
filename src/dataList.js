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
    const [perPage, setperPage] = useState(10);

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
        page: page,
        sizePerPage: 10,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        totalSize: 80,
        onPageChange: function (pageNum, recordPerPage) {
            fetch(`https://api.punkapi.com/v2/beers?page=${pageNum}&per_page=${recordPerPage}`)
                .then(res => res.json())
                .then(result => {
                    setDataLists(result);
                    setPage(pageNum);
                    setperPage(recordPerPage);
                })
                .catch(err => console.log(err));
        },
        onSizePerPageChange: function (recordPerPage, page) {
            fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${recordPerPage}`)
                .then(res => res.json())
                .then(result => {
                    setDataLists(result);
                    setPage(page);
                    setperPage(recordPerPage);
                })
                .catch(err => console.log(err));
        }
    });



    useEffect(() => {
        fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`)
            .then(res => res.json())
            .then(result => setDataLists(result))
            .catch(err => console.log(err));
    }, [page]);

    return <div>
        <BootstrapTable bootstrap4 keyField='id' columns={columns} data={dataLists} pagination={pagination} filter={filterFactory()} />
    </div>
}

export default DataList;