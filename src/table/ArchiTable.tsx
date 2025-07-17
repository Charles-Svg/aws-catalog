import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { Archi } from "@/lib/types"

type Archis = {
  architectures : Archi[]
}

export default function ArchiTable({architectures}: Archis){

    return(
    <div className="w-full overflow-x-auto">
        <Table className="mx-4 min-w-[600px]">
            <TableHeader>
                <TableRow>
                    <TableHead className="lg:w-1/3 w-1/2 min-w-[300px]"></TableHead>
                    <TableHead className="w-1/3">Description</TableHead>
                    <TableHead>Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {architectures.map((archi,i)=> (
                    <TableRow key ={i} className="align-top min-h-[10rem]">
                        <TableCell className="p-4">
                            <img src={`img/${archi.image}`} alt={archi.title} className="w-full h-auto object-contain"/>
                        </TableCell>
                        <TableCell className="whitespace-normal break-words max-w-xs p4" >
                            {archi.description}
                        </TableCell>
                        <TableCell className="p-4">
                            {archi.date}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
    )
}