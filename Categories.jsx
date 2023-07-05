import React from 'react';
import { Button, styled, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import {categories} from '../../constants/data.js';
import {Link, useSearchParams} from 'react-router-dom';
const Btn = styled(Button)`
position: absolute;
 width:35vh;
 height:8vh;
 font-size:25px;
 color:#FFF;
 border:none;
 border-radius:28px;
 &: hover{
  background-color:#0a0a23;
 }
`;
const StyledTable = styled(Table)`
 border:1px solid rgba(224,224,224,1);
`;

const StyledLink = styled(Link)`
 text-decoration:none;
 color:inherit;
`;
const Categories = () => {
  const [searchParams] = useSearchParams();

  const category = searchParams.get('category');
  

  return (
    <>
     <Link to={`/create?category=${category || ''}`} style={{ textDecoration: 'none' }}>
                <Btn variant="contained" color='success'>Create Blog</Btn>
            </Link>
            
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <StyledLink to={"/"}>
                                All Categories
                            </StyledLink>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category => (
                            <TableRow key={category.id}>
                                <TableCell>
                                    <StyledLink to={`/?category=${category.type}`}>
                                        {category.type}
                                    </StyledLink>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </StyledTable>
    </>
  )
}

export default Categories;
