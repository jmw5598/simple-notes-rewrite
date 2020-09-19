import { Controller, Get, Post, Param, Request, Body, UseGuards, Put, Delete } from '@nestjs/common';
import { SnLoggerService } from 'src/logger/sn-logger.service';
import { SectionDto } from '../dtos/section.dto';
import { CreateSectionDto } from '../dtos/create-section.dto';
import { SectionsService } from '../services/sections.service';
import { JwtAuthenticationGuard } from '../../authentication/guards/jwt-authentication.guard';
import { UpdateSectionDto } from '../dtos/update-section.dto';
import { UpdateSectionNotesDto } from '../dtos/update-section-notes.dto';

@Controller('topics/:topicId/sections')
@UseGuards(JwtAuthenticationGuard)
export class SectionsController {
  constructor(
    private readonly _sectionsService: SectionsService,
    private readonly _logger: SnLoggerService
  ) {
    this._logger.setContext(this.constructor.name);
  }

  @Post()
  public async createSection(
      @Request() request, 
      @Param('topicId') topicId: number, 
      @Body() createSectionDto: CreateSectionDto): Promise<SectionDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._sectionsService.createSection(accountId, topicId, createSectionDto);
    } catch (error) {
      this._logger.error('Error create new section!', error)
      throw error;
    }
  }

  @Get()
  public async getSectionsByTopic(@Param('topicId') topicId: number): Promise<any> {
    return { sections: `These are sections for topic with id ${topicId}` };
  }

  @Get(':sectionId')
  public async getSectionById(
      @Request() request,
      @Param('topicId') topicId: number,
      @Param('sectionId') sectionId: number): Promise<SectionDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._sectionsService.getSectionById(accountId, topicId, sectionId);
    } catch (error) {
      this._logger.error('Error getting section by id!', error);
      throw error;
    }
  }

  @Put(':sectionId')
  public async updateSectionById(
      @Request() request,
      @Param('topicId') topicId: number,
      @Param('sectionId') sectionId: number,
      @Body() updateSectionDto: UpdateSectionDto): Promise<SectionDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._sectionsService.updateSectionById(accountId, topicId, sectionId, updateSectionDto);
    } catch (error) {
      this._logger.error('Error getting section by id!', error);
      throw error;
    }
  }

  @Delete(':sectionId')
  public async deleteSectionById(
      @Request() request,
      @Param('topicId') topicId: number,
      @Param('sectionId') sectionId: number): Promise<SectionDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._sectionsService.deleteSectionById(accountId, topicId, sectionId);
    } catch (error) {
      this._logger.error('Error deleting section by id!', error);
      throw error;
    }
  }

  @Put(':sectionId/notes')
  public async updateSectionNotesById(
      @Request() request,
      @Param('topicId') topicId: number,
      @Param('sectionId') sectionId: number,
      @Body() updateSectionNotesDto: UpdateSectionNotesDto): Promise<SectionDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._sectionsService.updateSectionNotesById(accountId, updateSectionNotesDto);
    } catch (error) {
      this._logger.error('Error updating section notes by id!', error);
      throw error;
    }
  }
}
