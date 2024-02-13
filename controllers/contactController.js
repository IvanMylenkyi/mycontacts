const asyncHadler = require('express-async-handler');
const Contact = require("../models/contactModel")
//@desc get all contacts
//route
//@acces private

const getContacts= asyncHadler(async (req,res)=>{
    const contacts= await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

//@desc Create new contact
//@route get /api/contacts/:id
//@acces private

const getContact=asyncHadler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw Error("Contact not found");

    }
    res.status(200).json(contact);
});


//@desc Create new contact
//@route Post /api/contacts
//@acces private

const createContact=asyncHadler(async(req,res)=>{
    console.log("The request body is", req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const contact = await Contact.create({
        name, 
        email,
        phone,
        user_id:req.user.id,
    });
    res.status(201).json(contact);
});

//@desc update contact
//@route put /api/contacts/:id
//@acces private

const updateContact=asyncHadler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw Error("Contact not found");

    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don`t have permission to update other user contacts");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

    res.status(200).json(updatedContact);
});

//@desc delete new contact
//@route delete /api/contacts/:id
//@acces private

const deleteContact=asyncHadler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don`t have permission to update other user contacts");
    }
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact)
});




module.exports={getContact, createContact, getContacts, updateContact, deleteContact};
