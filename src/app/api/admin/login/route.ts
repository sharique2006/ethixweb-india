import { NextRequest,NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase-server";
const schema=z.object({email:z.string().email().max(254),password:z.string().min(1).max(200)});
export async function POST(request:NextRequest){
 try{
  const parsed=schema.safeParse(await request.json());
  if(!parsed.success)return NextResponse.json({error:"Enter a valid email and password."},{status:400});
  const adminEmail=process.env.ADMIN_EMAIL?.toLowerCase();
  if(!adminEmail||parsed.data.email.toLowerCase()!==adminEmail)return NextResponse.json({error:"Invalid credentials."},{status:401});
  const supabase=await createSupabaseServerClient();
  const {error}=await supabase.auth.signInWithPassword({email:parsed.data.email,password:parsed.data.password});
  if(error)return NextResponse.json({error:"Invalid credentials."},{status:401});
  return NextResponse.json({ok:true});
 }catch{return NextResponse.json({error:"Unable to sign in right now."},{status:500});}
}
