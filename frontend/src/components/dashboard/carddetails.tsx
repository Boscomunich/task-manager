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
import { GET_CARD, GET_WORKSPACE } from "@/graphql/query"
import { useMutation, useQuery } from "@apollo/client"
import { 
    AlarmClockCheck,
    AlarmClockOff,
    AlignRight, 
    CalendarClock, 
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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ADD_USER_TO_CARD, CREATE_CARD, CREATE_CHECKLIST, DELETE_CHECKLIST, MOVE_CARD, REMOVE_USER_FROM_CARD, UPDATE_CARD, UPDATE_CHECKLIST } from '@/graphql/mutation';
import { Checkbox } from "../ui/checkbox"

type CardPropsType = {
    workspaceData: any
    id: string
    name: string
    listId: string
    checkList: any[]
    assignedTo: string[]
    description: string
    startDate: string
    endDate: string
    updatedAt: string
}

function Card (props: CardPropsType) {
    const [startDate, setStartDate] = React.useState('')
    const [endDate, setEndDate] = React.useState('')
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [checkListTitle, setCheckListTitile] = React.useState('')
    const [destinationId, setDestinationId] = React.useState('')
    const [IncludeUserToCard, { loading }] = useMutation(ADD_USER_TO_CARD);
    const [UpdateCard, { loading: loading2 }] = useMutation(UPDATE_CARD);
    const [MoveCard, { loading: loading3 }] = useMutation(MOVE_CARD);
    const [CreateCheckList, { loading: loading4 }] = useMutation(CREATE_CHECKLIST);
    const [RemoveUserFromCard] = useMutation(REMOVE_USER_FROM_CARD);
    const [UpdateCheckList] = useMutation(UPDATE_CHECKLIST);
    const [DeleteCheckList] = useMutation(DELETE_CHECKLIST);

    //handles the logic to add members to card
    async function addUser (id: string) {
        if (!id) return
        try {
            const response = await IncludeUserToCard({ 
                variables: { id: props.id, userId: id },
                refetchQueries: [{ query: GET_CARD, variables: { id: props.id } }], 
            })
            console.log(response)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    //handles the logic to remove members from  particular card
    async function removeUser (id: string) {
        if (!id) return
        try {
            const response = await RemoveUserFromCard ({ 
                variables: { id: props.id, userId: id },
                refetchQueries: [{ query: GET_CARD, variables: { id: props.id } }], 
            })
            console.log(response)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    //handles to logic the upadate cards details
    async function updateCard () {
        const formattedStartDate = new Date(startDate).toISOString();
        const formattedEndDate = new Date(endDate).toISOString();
        const newUpdatedAt = new Date().toISOString();
        try {
            const response = await UpdateCard ({ 
                variables: { 
                    id: props.id, 
                    listId: props.listId, 
                    name: name, 
                    description: description,
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                    updatedAt: newUpdatedAt
                },
                refetchQueries: [{ query: GET_CARD, variables: { id: props.id } }], 
            })
            console.log(response)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    //handles the move card functionality to move cards between list items
    async function moveCard() {
        try {
            const response = await MoveCard({ 
                variables: { 
                    id: props.id, 
                    listId: destinationId, 
                },
                refetchQueries: [{ query: GET_WORKSPACE, variables: { id: props.workspaceData.id } }]
            });
            console.log(response);
        } catch (error: any) {
            console.log(error.message);
        }
    }

    //handles creation of new checlist items
    async function createCheckList () {
        if (!checkListTitle) return
        try {
            const response = await CreateCheckList({ 
                variables: { name: checkListTitle, cardId: props.id },
                refetchQueries: [{ query: GET_CARD, variables: { id: props.id } }], 
            })
            console.log(response)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    //handle the updating of the checked variable in the checklist object
    async function updateCheckList (id: string, checked: boolean) {
        try {
            const response = await UpdateCheckList({ 
                variables: { id, checked },
                refetchQueries: [{ query: GET_CARD, variables: { id: props.id } }], 
            })
            console.log(response)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    //handles delete checklist functionality to delete checklist items
    async function deleteCheckList (id: string) {
        try {
            const response = await DeleteCheckList({ 
                variables: { id },
                refetchQueries: [{ query: GET_CARD, variables: { id: props.id } }], 
            })
            console.log(response)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    return (
        <div className="flex justify-center sm:flex-col">
            <div className="w-[70%] sm:w-full flex justify-between items-start">
                <div className="flex flex-col gap-3">
                    <div className="flex justify-start gap-2 items-center my-2">
                        <Computer />
                        <h1>{props.name}</h1>
                    </div>
                    <div className="my-2">
                        <p className="text-[16px] font-bold">Members</p>
                        {
                            props.assignedTo?.map((user: any) => (
                                <div key={user.id}>{user.email}</div>
                            ))
                        }
                    </div>
                    <div className="my-2">
                        <div className="flex justify-start gap-2">
                            <AlignRight />
                            <p className="text-[16px] font-bold">Description</p>
                        </div>
                        <div>{props.description}</div>
                    </div>
                    <div>
                        {
                            props.checkList && (
                                <p className="text-[16px] font-bold">Checklist</p>
                            )
                        }
                        {
                            props.checkList?.map((item: any) => (
                                <div className="flex flex-col justify-start items-start gap-4"
                                key={item.id}>
                                    <div className="flex items-center space-x-2 py-1">
                                    <Checkbox 
                                    id={item.name} 
                                    checked={item.checked}
                                    onClick={() => updateCheckList(item.id, !item.checked)}/>
                                    <label
                                        htmlFor={item.name}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {item.name}
                                    </label>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="flex flex-col lg:mr-10 md:mr-10">
                    <div className="my-2">
                        <div className="flex justify-start gap-2">
                            <AlarmClockCheck />
                            <p className="text-[16px] font-bold">Start date</p>
                        </div>
                        <div>{new Date(Number(props.startDate)).toLocaleString()}</div>
                    </div>
                    <div className="my-2">
                        <div className="flex justify-start gap-2">
                            <AlarmClockOff />
                            <p className="text-[16px] font-bold">End date</p>
                        </div>
                        <div>{new Date(Number(props.endDate)).toLocaleString()}</div>
                    </div>
                    <div className="my-2">
                        <div className="flex justify-start gap-2">
                            <CalendarClock />
                            <p className="text-[16px] font-bold">Last updated</p>
                        </div>
                        <div>{new Date(Number(props.updatedAt)).toLocaleString()}</div>
                    </div>
                </div>
            </div>
            <div className="w-[30%] sm:w-full flex-wrap flex lg:flex-col gap-4">
                <p className="sm:w-full sm:pt-5">Add to card</p>

                {/** used to add members to your card*/}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button className="w-[150px] gap-2">
                                <UsersRound  />
                                <p>Members</p>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 text-[14px] font-medium">
                        <div className="flex flex-col border shadow-xl p-2 my-1">
                            <p className="py-2">Card members</p>
                            {
                                props.assignedTo?.map((user:any) => (
                                    <div key={user.id} className='rounded-sm px-3 py-1 hover:bg-slate-900'
                                    onClick={() => removeUser(user.id)}>
                                        {user.email}
                                    </div>
                                ))
                            }
                        </div>
                        <div className="flex flex-col border shadow-xl p-2">
                            <p className='py-2'>Board members</p>
                            {
                                props.workspaceData?.workers.map((worker:any) => (
                                    <div key={worker.id} className='rounded-sm px-3 py-1 hover:bg-slate-900'
                                    onClick={() => addUser(worker.id)}>
                                        {worker.email}
                                    </div>
                                ))
                            }
                        </div>
                    </PopoverContent>
                </Popover>

                {/** popover rallows your to create new checkList */}
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
                                    onChange={(e) => setCheckListTitile(e.target.value)}
                                />
                                </div>
                                <Button size='sm' className="w-[50px] gap-2 text-white bg-blue-500 hover:bg-blue-500"
                                onClick={() => createCheckList()}>
                                    Add
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

                {/** popover allow you to move card between diffrent list */}
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
                                <Select onValueChange={(value) => setDestinationId(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select new list"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        props.workspaceData.lists?.map((list: any) => (
                                            <SelectItem key={list.id} value={list.id}>{list.name}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                                </Select>
                                <Button size='sm' className="w-[50px] gap-2 text-white bg-blue-500 hover:bg-blue-500"
                                onClick={() => moveCard()}>
                                    Add
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
                
                {/** popover renders a form to edit card informations */}
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
                                onChange={(e) => setName(e.target.value)}
                            />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="maxWidth"
                                defaultValue={props.description}
                                className="col-span-2 h-8"
                                onChange={(e) => setDescription(e.target.value)}
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
                            <Button size='sm' className="w-[100px] gap-2 text-white bg-blue-500 hover:bg-blue-500"
                            onClick={() => updateCard()}>
                                Update
                            </Button>
                        </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

//CardDetails component types
type PropType = {
    id: string
    workspaceData: any
    showCardDetails: boolean
    setShowCardDetails: React.Dispatch<React.SetStateAction<boolean>>
}

//renders a modal to display card details
export default function CardDetails ({id, showCardDetails, setShowCardDetails, workspaceData}: PropType) {

    const { data, error } = useQuery(GET_CARD, {
        variables: { id },
    });

    const cardProps = data?.GetCard

    return (
        <Dialog open={showCardDetails} onOpenChange={setShowCardDetails}>
            <DialogTrigger asChild>
            <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="w-[750px] min-w-[80vw] h-[85vh] overflow-scroll">
            <DialogHeader>
                <DialogTitle>Edit Card</DialogTitle>
                <DialogDescription>
                Make changes to card and view card details
                </DialogDescription>
            </DialogHeader>
            <Card {...cardProps} workspaceData={workspaceData}/>
            </DialogContent>
        </Dialog>
        )
    }