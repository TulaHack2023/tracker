import { Injectable,Get } from '@nestjs/common';
import { NotificationsService } from '../notifications-service';
import { TelegramService as TGService } from 'nestjs-telegram';
import TelegramBot =require('node-telegram-bot-api') 
import {Start,Update,Ctx,On,Message} from 'nestjs-telegraf';
import {Scenes,Telegraf} from 'telegraf';
import { message } from 'telegram/client';

type Context = Scenes.SceneContext;

@Update()
export class TelegramService extends Telegraf<Context>{
  @Start()
  onStart(@Ctx() ctx: Context) {
    return ctx.reply(`Привет ${ctx.from.username}`);
  }
  @On('text')
  onMessage(@Message('text') message:string, @Ctx() ctx: Context){
    ctx.replyWithHTML(`<i>${message}<i>`);
  }
}


