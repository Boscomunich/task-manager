import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GET_CARD } from "@/graphql/query"
import { useQuery } from "@apollo/client"
import { 
    AlignRight, 
    CalendarIcon, 
    Computer, 
    FilePenLine, 
    ListChecks, 
    MoveHorizontal, 
    UsersRound } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import * as React from "react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { DayPicker } from "react-day-picker"





function Card (props: any) {
    const [startDate, setStartDate] = React.useState<Date>()
    const [endDate, setEndDate] = React.useState<Date>()
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    return (
        <div className="flex justify-center sm:flex-col">
            <div className="w-[70%] sm:w-full">
                <div className="flex justify-start gap-2 items-center my-2">
                    <Computer />
                    <h1>{props.name}</h1>
                </div>
                <div className="my-2">
                    <p>Members</p>
                    {}
                </div>
                <div className="my-2">
                    <div className="flex justify-start gap-2">
                        <AlignRight />
                        <p>Description</p>
                    </div>
                    
                </div>
                {/**checklist */}
            </div>
            <div className="w-[30%] sm:w-full flex flex-col gap-4">
                <p>Add to card</p>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button className="w-[150px] gap-2">
                                <UsersRound  />
                                <p>Members</p>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="flex flex-col gap-2">
                            <p className="text-[12px] font-medium">Card members</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>Board members</p>
                        </div>
                    </PopoverContent>
                </Popover>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button className="w-[150px] gap-2">
                                <ListChecks/>
                                <p>Checklists</p>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="name">Title</Label>
                                <Input
                                    id="checklist"
                                    className="col-span-2 h-8"
                                />
                                </div>
                                <Button size='sm' className="w-[50px] gap-2 text-white bg-blue-500 hover:bg-blue-500">
                                    Add
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button className="w-[150px] gap-2">
                                <MoveHorizontal/>
                                <p>Move</p>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="name">Title</Label>
                                <Input
                                    id="checklist"
                                    className="col-span-2 h-8"
                                />
                                </div>
                                <Button size='sm' className="w-[50px] gap-2 text-white bg-blue-500 hover:bg-blue-500">
                                    Add
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button className="w-[150px] gap-2">
                                <FilePenLine />
                                <p>Edit Card</p>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Edit Card</h4>
                        </div>
                        <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="width"
                                defaultValue={props.name}
                                className="col-span-2 h-8"
                            />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="maxWidth"
                                defaultValue={props.description}
                                className="col-span-2 h-8"
                            />
                            </div>
                            <Popover>
                            <PopoverTrigger asChild>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="startdate">Start date</Label>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[180px] justify-start text-left font-normal ",
                                    !startDate && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <DayPicker          
                                    mode="single"
                                    selected={startDate}
                                    onSelect={setStartDate}
                                />
                            </PopoverContent>
                            </Popover>
                            <Popover>
                            <PopoverTrigger asChild>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="startdate">End date</Label>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[180px] justify-start text-left font-normal ",
                                    !startDate && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <DayPicker          
                                    mode="single"
                                    selected={endDate}
                                    onSelect={setEndDate}
                                />
                            </PopoverContent>
                            </Popover>
                        </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

type PropType = {
    id: string
    showCardDetails: boolean
    setShowCardDetails: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CardDetails ({id, showCardDetails, setShowCardDetails}: PropType) {

    const { data, error } = useQuery(GET_CARD, {
        variables: { id },
    });

    React.useEffect(() => {
        if (data?.GetCard) console.log(data.GetCard)
        if (error) console.log(error)
    })

    const cardProps = data?.GetCard

    return (
        <Dialog open={showCardDetails} onOpenChange={setShowCardDetails}>
            <DialogTrigger asChild>
            <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="w-[750px] min-w-[80vw] h-auto">
            <DialogHeader>
                <DialogTitle>Edit Card</DialogTitle>
                <DialogDescription>
                Make changes to card and view card details
                </DialogDescription>
            </DialogHeader>
            <Card {...cardProps}/>
            </DialogContent>
        </Dialog>
        )
    }