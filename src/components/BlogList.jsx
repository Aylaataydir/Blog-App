import React, { useEffect, useState } from 'react'
import useBlogCall from '../hooks/useBlogCall'
import { useSelector } from 'react-redux'
import BlogCard from './BlogCard'
import { Link, useSearchParams } from 'react-router';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack'
import { slugify } from '../lib/slugify';



const LIMIT = 5;

const BlogList = () => {
    const { paginationBlogs, blogs, categories } = useSelector((state) => state.blog);
    const { getDataByEndpoint } = useBlogCall();
    const [totalCount, setTotalCount] = useState(0); // toplam blog sayisi

    const [searchParams] = useSearchParams() // react router hooku. icerisinde page ve category kisimlarini barindiriyor. url de ki search kismina erisiyoruz bununla
    const page = parseInt(searchParams.get('page') || '1', 10);
    const category = searchParams.get('category')
    const categoryId = categories?.find(cat => slugify(cat.name) === category)?._id

    const { isSearching } = useSelector(state => state.blog)



    useEffect(() => {
        const skip = (page - 1) * LIMIT;
        const params = { limit: LIMIT, skip }

        if (category) {
            params["filter[categoryId]"] = categoryId; //bir objenin icerisine bu sekilde key ve value ekleyebiliyoruz.
        }

        getDataByEndpoint("blogs", params, "paginationBlogs").then((data) => {
            if (data?.details?.totalRecords) setTotalCount(data.details.totalRecords);
        });

    }, [page, category])

    const pageCount = totalCount ? Math.ceil(totalCount / LIMIT) : 1;

    return (

        <Stack spacing={4} alignItems="center" className='pe-8 mb-6'>
            <div className="w-full">
                {isSearching
                    ?
                    (<>
                        {blogs?.length === 0 && (
                            <p className="text-lg text-center">Sorry, we couldn't find any results matching your search.</p>
                        )}

                        {blogs?.map((blog) => (
                            <BlogCard key={blog._id} blog={blog} />
                        ))}
                    </>
                    )
                    :
                    (<>
                        {paginationBlogs?.length === 0 && (
                            <p className="text-lg text-center">No blogs found in this category..</p>
                        )}

                        {paginationBlogs?.map((blog) => (
                            <BlogCard key={blog._id} blog={blog} />
                        ))}
                    </>
                    )}
            </div>

            <Pagination
                page={page} // su an aktif olan sayfa numarasi
                count={pageCount} //toplam sayfa saysi

                renderItem={(item) => {
                    if (paginationBlogs?.length > 0) {
                        return (
                            <PaginationItem
                                component={Link}
                                to={(() => {
                                    const newParams = new URLSearchParams(searchParams) // url de ki parametreleri kopyaliyoruz.
                                    if(item.page > 1 ) newParams.set("page", item.page)
                                    else newParams.delete("page")
                                    const query = newParams.toString() // urlde yan yana dizme islemi icin bunu yapiyoruz, yoksa obje formatinda icerik.
                                    return `/home${query ? `?${query}` : ""}`
                                })()}
                                {...item}
                            />
                        )
                    }
                }}
            />
        </Stack>
    );
};

export default BlogList;