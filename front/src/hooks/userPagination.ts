import React from 'react'

export const usePagination = (limit: number) => {
    const [page, setPage] = React.useState(0);

    const goNext = () => {
        if(page + 1 > limit)return;
        setPage((prevPage) => prevPage + 1);
    };

    const goPrev = () => {
        if (page - 1 < 0) return;
        setPage((prevPage) => prevPage - 1);

    };
    
    return { page, goNext, goPrev}
}