import { Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { TranslationSettingsModule } from '../../translation-settings.module';
import { ResultEntryComponent } from './result-entry.component';
import { NamedIcon, ResultEntry } from '../../search-service/search.types';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const ResultEntryModuleImports = moduleMetadata({
  declarations: [ResultEntryComponent],
  imports: [
    CommonModule,
    TranslationSettingsModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
    MatButtonModule,
    BrowserAnimationsModule,
  ],
});

const Template: Story<ResultEntryComponent> = (args: ResultEntryComponent) => ({
  component: ResultEntryComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  entry: getResultEntry(0),
};

export const DeactivateHighlighting = Template.bind({});
DeactivateHighlighting.args = {
  entry: getResultEntry(0),
  highlightingActivated: false,
};

export const AvatarIconResult = Template.bind({});
AvatarIconResult.args = {
  entry: getResultEntry(1),
};

export const AvatarImageResult = Template.bind({});
AvatarImageResult.args = {
  entry: getResultEntry(2),
};

export const WithImage = Template.bind({});
WithImage.args = {
  entry: getResultEntry(3),
};

export const WithMetaInfo = Template.bind({});
WithMetaInfo.args = {
  entry: getResultEntry(4),
};

export const WithTags = Template.bind({});
WithTags.args = {
  entry: getResultEntry(5),
};

export const WithActions = Template.bind({});
WithActions.args = {
  entry: getResultEntry(6),
};

export const ShowMoreDescription = Template.bind({});
ShowMoreDescription.args = {
  entry: getResultEntry(7),
};

export const ShowMoreLimit = Template.bind({});
ShowMoreLimit.args = {
  entry: getResultEntry(7),
  showMoreWordLimit: 150,
};
export const AllFeatures = Template.bind({});
AllFeatures.args = {
  entry: getResultEntry(8),
};
export const ChangeText = Template.bind({});
ChangeText.args = {
  entry: getResultEntry(7),
  resultEntryText: {
    showLess: 'Show less text',
    showMore: 'Show more text',
    showFewMore: 'Show a little bit more text',
  },
};

function getResultEntry(index: number): ResultEntry {
  const resultEntry: ResultEntry = {
    title: '<em>Dog</em>',
    description: 'This is a result about <em>dog</em>s!',
  };
  const actions: NamedIcon[] = [
    { icon: 'share', name: 'shareAction', description: 'Share' },
    {
      icon: 'favorite',
      name: 'favoriteAction',
      description: 'Mark as favorite',
    },
  ];

  const subTitles: NamedIcon[] = [
    { icon: 'face', description: 'Mr. Max', name: 'dogName' },
    { icon: 'elderly', description: '7 years old', name: 'dogAge' },
  ];
  const tags = ['Good boy', 'Golden retriever', 'Pet toy enthusiasts'];
  const avatarImgSrc =
    'https://upload.wikimedia.org/wikipedia/commons/d/dd/Golden_Retriever_Hund_Dog.JPG';
  const imageSrc =
    'https://cdn.pixabay.com/photo/2019/08/30/20/22/dog-4442214_1280.jpg';
  return [
    resultEntry,
    { ...resultEntry, avatarIcon: 'pets', avatarToolTip: 'Pets' },
    {
      ...resultEntry,
      avatarImgSrc,
      avatarToolTip: 'Doggo',
    },
    {
      ...resultEntry,
      imageSrc,
    },
    {
      ...resultEntry,
      avatarImgSrc,
      subTitles,
    },
    {
      ...resultEntry,
      avatarImgSrc,
      tags,
    },
    {
      ...resultEntry,
      actions,
    },
    {
      ...resultEntry,
      description: `
      This is a result about <em>dog</em>s!
      <p>The domestic <em>dog</em> (Canis familiaris or Canis lupus familiaris) is a domesticated form of wolf.
      The <em>dog</em> descended from an ancient, extinct wolf, with the modern wolf being the <em>dog</em>'s nearest living relative.
      The <em>dog</em> was the first species to be domesticated by hunter–gatherers more than 15,000 years ago, prior to the development of agriculture.
      Their long association with humans has led <em>dog</em>s to be uniquely attuned to human behavior,
      enabling an abundant cosmopolitan distribution and to be able to thrive on a starch-rich diet that would be inadequate for other canids.
      The <em>dog</em> has been selectively bred over millennia for various behaviors, sensory capabilities and physical attributes.
      <em>dog</em>s are subclassified into breeds, which vary widely in shape, size and color. They perform many roles for humans, such as hunting,
      herding, pulling loads, protection, assisting police and the military, companionship, therapy and aiding disabled people.
      This influence on human society has given them the sobriquet of "man's best friend."</p>
      `,
    },
    {
      ...resultEntry,
      actions,
      tags,
      subTitles,
      imageSrc,
      avatarImgSrc,
      avatarToolTip: 'Doggo',
      id: '99',
    },
  ][index];
}
